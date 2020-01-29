import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import * as json2csv from 'json2csv';

import { db } from './config';

const adminStorage = admin.storage();
const GCS_BUCKET = functions.config().gcs.bucket;

export const createCSV = functions.firestore
    .document('reports/{reportId}')
    .onCreate(async (snapshot, context) => {

        // Step 1. Set up main variables
        const reportId = context.params.reportId;
        const fileName = `reports/${reportId}.csv`;
        const tempFilePath = path.join(os.tmpdir(), fileName);
        
        // Children and Pets
        const memChildren:Array<any> = [];
        const memPets:Array<any> = [];

        // Reference report in Firestore
        const reportRef = db.collection('reports').doc(reportId);

        // Reference Storage Bucket
        const storage = adminStorage.bucket(GCS_BUCKET);

        // Step 2. Query collection

        // Children and Pets
        await db.collection('jrResidents').orderBy('displayName.lastName').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    memChildren.push( doc.data() )
                });
                // console.log(children);
            });

        await db.collection('pets').orderBy('petName').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    memPets.push( doc.data() )
                });
        });

        return db.collection('users').orderBy('displayName.lastName')
                 .get()
                 .then(querySnapshot => {
                    /// Step 3. Creates CSV file from with users collection
                    const allUsers:Array<any> = []

                    // create array of member data
                    querySnapshot.forEach(doc => {
                        let member = doc.data();
                        member.id = doc.data().uid;
                        member.lastName = doc.data().displayName.lastName;
                        member.firstName = doc.data().displayName.firstName;
                        member.phone = doc.data().phone;
                        member.streetNumber = doc.data().address.streetNumber;
                        member.streetName = doc.data().address.streetName;
                        member.paidDues = doc.data().paidDues;
                        member.email = doc.data().email;
                        member.spFirstName = doc.data().spousePartner.firstName;
                        member.spLastName = doc.data().spousePartner.lastName;
                        member.allChildren = [];
                        member.allPets = [];

                        for(let i = 0; i < memChildren.length; i++) {
                            if (memChildren[i].parentIDs.includes(member.id)) {
                                member.allChildren.push(memChildren[i].displayName.firstName + ' ' + memChildren[i].displayName.lastName);
                            }
                        }

                        memPets.forEach(petDoc => {
                            if (petDoc.petParentIDs.includes(member.id) ) {
                                member.allPets.push(petDoc.petName + ' | Color: ' + petDoc.color + ', Breed: ' + petDoc.breed);
                            }
                        })
                        
                        allUsers.push( member )
                    });

                    const fields = [
                        {label: 'LastName',
                        value: 'lastName'},
                        {label: 'FirstName',
                        value: 'firstName'},
                        {label: 'Phone',
                        value: 'phone'},
                        {label: 'StreetNumber',
                        value: 'streetNumber'},
                        {label: 'StreetName',
                        value: 'streetName'},
                        {label: 'PaidDues',
                        value: 'paidDues'},
                        {label: 'Email',
                        value: 'email'},
                        {label: 'S/P FirstName',
                        value: 'spFirstName'},
                        {label: 'S/P LastName',
                        value: 'spLastName'},
                        {label: 'Children',
                        value: 'allChildren'},
                        {label: 'Pets',
                        value: 'allPets'}
                    ];
                    // console.log(allUsers);
                    const opts = { fields };
                    return json2csv.parse(allUsers, opts);
                 })
                .then(csv => {
                    // Step 4. Write the file to cloud function tmp storage
                    return fs.outputFile(tempFilePath, csv);
                })
                .then(() => {
                    // Step 5. Upload the file to Firebase cloud storage
                    return storage.upload(tempFilePath, { destination: fileName })
                })
                .then(file => {
                    // Step 6. Update status to complete in Firestore 

                    return reportRef.update({ status: 'complete' })
                })
                .catch(err => console.log(err) )
    })