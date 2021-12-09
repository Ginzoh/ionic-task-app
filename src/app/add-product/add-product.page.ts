import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ADDTASK } from '../constants/formValidationMessage';
import { HelperService } from '../providers/helper.service';
import { FirestoreDbService } from '../providers/firestore-db.service';
import { WidgetUtilService } from '../widget-util.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  editTaskForm: FormGroup;
  titre: FormControl;
  description: FormControl;
  formError: any = {
    titre: '',
    description: '',
  };
  validationMessage: any = ADDTASK;
  myDate = Date.now();
  constructor(
    private firestoreDbService: FirestoreDbService,
    private helperService: HelperService,
    private widgetUtilService: WidgetUtilService,
    public db: AngularFirestore
  ) {}
  items: Observable<any[]>;
  firebaseText: string;
  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }
  resetForm() {
    this.editTaskForm.reset();
    this.formError = {
      titre: '',
      description: '',
    };
  }

  addTask() {
    try {
      this.firestoreDbService.insertData('tasks', {
        titre: this.titre.value,
        description: this.description.value,
        date_de_creation: formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en'),
        date_dernier_modif: formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en'),
      });
      this.widgetUtilService.presentToast('Task added successfully');
      this.resetForm();
    } catch (error) {
      console.log(error);
      this.widgetUtilService.presentToast(error.message);
    }
  }

  createFormControl() {
    this.titre = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
  }

  createForm() {
    this.editTaskForm = new FormGroup({
      titre: this.titre,
      description: this.description,
    });
    this.editTaskForm.valueChanges.subscribe((data) =>
      this.onFormValueChanged(data)
    );
  }

  onFormValueChanged(data) {
    this.formError = this.helperService.prepareValidationMessage(
      this.editTaskForm,
      this.validationMessage,
      this.formError
    );
  }
}
