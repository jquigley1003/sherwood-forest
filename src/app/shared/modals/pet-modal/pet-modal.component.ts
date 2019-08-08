import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../../../models/pet.model';

import { ToastService } from '../../services/toast.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.scss'],
})
export class PetModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
