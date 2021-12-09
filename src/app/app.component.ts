import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './providers/firebase-auth.service';
import { WidgetUtilService } from './widget-util.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private firebaseAuthService: FirebaseAuthService,
    private widgetUtilService: WidgetUtilService
  ) {}
  initializeApp() {}
}
