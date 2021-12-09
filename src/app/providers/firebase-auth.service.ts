import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private angularFireAuth: AngularFireAuth) {}
  async loginWithEmailPassword(email, password) {
    try {
      const result = await this.angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  getAuthState() {
    return this.angularFireAuth.authState;
  }
  SignOut() {
    this.angularFireAuth.signOut();
  }
}
