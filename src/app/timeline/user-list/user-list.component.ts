import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../class/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public usersRef: AngularFirestoreCollection<User>;
  public users: Observable<User[]>;

  constructor(
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usersRef = this.angularFirestore.collection('users');
    this.users = this.usersRef.valueChanges();
  }

  goUserDetail(user: User): void {
    this.router.navigate(['users', user.uid]);
  }

}
