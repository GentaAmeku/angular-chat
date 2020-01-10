import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Comment } from '../../class/comment';
import { User } from '../../class/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input() private currentUser: User;
  @Input() private commentsCollection: AngularFirestoreCollection;

  public message: string;

  constructor(
    private angularFireStore: AngularFirestore,
  ) {}

  private classToObject = classObject => ({ ...classObject });

  ngOnInit() {}

  sendMessage(message: string): void {
    const documentId = this.angularFireStore.createId();
    const currentUserObject = this.classToObject(this.currentUser);
    const commentObject = this.classToObject(new Comment(currentUserObject, message));
    this.commentsCollection
      .doc(documentId)
      .set(commentObject)
      .then(() => this.message = '');
  }
}
