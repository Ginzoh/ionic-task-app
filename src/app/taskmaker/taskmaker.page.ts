import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreDbService } from '../providers/firestore-db.service';

@Component({
  selector: 'app-taskmaker',
  templateUrl: './taskmaker.page.html',
  styleUrls: ['./taskmaker.page.scss'],
})
export class TaskmakerPage {
  productList: Array<any> = [];

  constructor(
    private router: Router,
    private firestoreDbService: FirestoreDbService,
    public authService: AuthenticationService
  ) {
    this.getProductList();
  }
  getProductList() {
    this.firestoreDbService.getAllData('tasks').subscribe((result) => {
      console.log('result', result);
      this.productList = result;
    });
  }
  openTaskDetailPage(id) {
    this.router.navigate(['/task-detail', id]);
  }
  openAddProductPage() {
    this.router.navigate(['/add-product']);
  }
}
