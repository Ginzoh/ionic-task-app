import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EDITTASK } from '../constants/formValidationMessage';
import { FirestoreDbService } from '../providers/firestore-db.service';
import { WidgetUtilService } from '../widget-util.service';
import { HelperService } from '../providers/helper.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  productId: string = '';
  productDetail: any = {};
  showEditTaskForm: boolean = false;
  productDetailList: Array<any> = [];
  editTaskForm: FormGroup;
  titre: FormControl;
  description: FormControl;
  formError: any = {
    titre: '',
    description: '',
  };
  validationMessage: any = EDITTASK;
  myDate = Date.now();
  constructor(
    private firestoreDbService: FirestoreDbService,
    private helperService: HelperService,
    private activateRoute: ActivatedRoute,
    private widgetUtilService: WidgetUtilService,
    private db: AngularFirestore
  ) {
    this.activateRoute.params.subscribe((result) => {
      console.log('result==', result);
      this.productId = result.id;
      this.getTaskDetail();
    });
  }
  resetForm() {
    this.editTaskForm.reset();
    this.formError = {
      titre: '',
      description: '',
    };
  }
  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }
  updateTask() {
    try {
      const updatedTaskDetails = {};
      for (const formField in this.editTaskForm.controls) {
        const control = this.editTaskForm.controls[formField];
        if (control.dirty) {
          console.log('---', formField, control);
          updatedTaskDetails[formField] = control.value;
        }
      }
      console.log('Updated Task', updatedTaskDetails);
      this.firestoreDbService.updateData(
        'tasks',
        this.productId,
        updatedTaskDetails
      );
      this.firestoreDbService.updateData('tasks', this.productId, {
        date_dernier_modif: formatDate(new Date(), 'HH:mm:ss dd/MM/yyyy', 'en'),
      });

      this.getTaskDetail();
      this.openEditTaskForm();
      this.widgetUtilService.presentToast('Task has been updated');
    } catch (error) {
      this.widgetUtilService.presentToast(error.message);
    }
  }
  async getTaskDetail() {
    try {
      const result = await this.firestoreDbService.getDataById(
        'tasks',
        this.productId
      );
      console.log('task detail', result);
      this.productDetail = result;
      this.productDetailList = [];
      for (const key in this.productDetail) {
        this.productDetailList.push({
          name: key,
          value: this.productDetail[key],
        });
      }
    } catch (error) {
      console.log(error);
      this.widgetUtilService.presentToast(error.message);
    }
  }
  openEditTaskForm() {
    this.resetForm();
    for (const key in this.editTaskForm.controls) {
      console.log('$$$', key);
      this.editTaskForm.controls[key].setValue(this.productDetail[key]);
    }
    this.showEditTaskForm = true;
  }
  cancelEdit() {
    this.showEditTaskForm = false;
  }
  deleteTask() {}
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
