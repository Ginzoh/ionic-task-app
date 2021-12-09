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
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.getAuthState();
  }
  getAuthState() {
    this.firebaseAuthService.getAuthState().subscribe(
      (user) => {
        console.log('user auth state===', user ? user.toJSON() : null);
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        this.handleNavigation();
      },
      (error) => {
        this.widgetUtilService.presentToast(error.message);
      }
    );
  }
  handleNavigation() {
    if (this.isLoggedIn) {
      const currentUrl = this.router.url.split('/')[1];
      if (currentUrl === 'login' || currentUrl === 'signup') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
