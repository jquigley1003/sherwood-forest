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

        // Reference report in Firestore
        const reportRef = db.collection('reports').doc(reportId)

        // Reference Storage Bucket
        const storage = adminStorage.bucket(GCS_BUCKET)

        // Step 2. Query collection
        return db.collection('users')
                 .get() 
                 .then(querySnapshot => {
                    
                    /// Step 3. Creates CSV file from with users collection
                    const allUsers:Array<any> = []

                    // create array of order data
                    querySnapshot.forEach(doc => {
                        allUsers.push( doc.data() )
                    });

                    const fields = [
                        'displayName.lastName', 
                        'displayName.firstName', 
                        'phone',
                        'address.streetNumber',
                        'address.streetName',
                        'duesPaid',
                        'email'
                    ];
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