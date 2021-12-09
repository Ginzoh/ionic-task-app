import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication-service';

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.page.html',
  styleUrls: ['./my-login.page.scss'],
})
export class MyLoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}
  logIn(email, password) {
    this.authService
      .SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['taskmaker']);
        } else {
          this.router.navigate(['taskmaker']);
          window.alert('Email is not verified');
          return false;
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
