import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../class/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public usersRef: AngularFirestoreCollection<User>;
  public user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private location: Location
  ) { }

  ngOnInit() {
    const uid = this.activatedRoute.snapshot.paramMap.get('uid');
    this.usersRef = this.angularFirestore.collection<User>('users');
    this.usersRef
      .doc(uid)
      .valueChanges()
      .subscribe((user: User) => {
        this.user = new User(user);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
