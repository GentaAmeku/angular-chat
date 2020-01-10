import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  async login(email: string, password: string): Promise<void> {
    await this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => Promise.reject(error));

    this.router.navigate(['/timeline']);
  }

  async logout(): Promise<void> {
    await this.angularFireAuth.auth.signOut().catch(error => {
      console.error(error);
    });

    this.router.navigate(['/login']);
  }
}
