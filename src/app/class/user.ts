export class User {
  uid: number;
  displayName: string;
  email: string;
  photoURL: string;

  constructor({ uid, displayName, email, photoURL }) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
  }
}
