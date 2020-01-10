import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Router } from '@angular/router';

interface UserProfile {
  uid?: string;
  displayName: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userCollection: AngularFirestoreCollection<UserProfile>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {
    this.userCollection = this.angularFirestore.collection<UserProfile>('users');
  }

  private createUserDocument = ({ uid, displayName, email }: UserProfile): Promise<void> =>
    this.userCollection.doc(uid).set({ uid, displayName, email })

  async create({ displayName, email, password }: UserProfile): Promise<void> {
    const userCredential = await this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => Promise.reject(error));

    if (userCredential) {
      await this.createUserDocument({ uid: userCredential.user.uid, displayName, email })
        .catch(error => Promise.reject(error));

      await this.update({ displayName });
      this.router.navigate(['/']);
    }
  }

  async update(profile): Promise<void> {
    await this.angularFireAuth.auth.currentUser
      .updateProfile(profile)
      .catch(error => {
        return Promise.reject(error);
      });

    this.router.navigate(['/']);
  }
}
