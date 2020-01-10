import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../class/user';
import { Comment } from '../../class/comment';
import * as compareAsc from 'date-fns/compare_asc';

interface CommentWithAction extends Comment {
  isEdit?: boolean;
  isShowMenu?: boolean;
  isHover?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public currentUser: User;
  public comments: CommentWithAction[];

  private commentsCollection: AngularFirestoreCollection<CommentWithAction>;

  constructor(
    private elementRef: ElementRef,
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
  ) {}

  ngOnInit() {
    if (this.angularFireAuth.auth.currentUser) {
      this.currentUser = new User(this.angularFireAuth.auth.currentUser);
    } else {
      this.angularFireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.currentUser = new User(this.angularFireAuth.auth.currentUser);
        }
      });
    }

    this.commentsCollection = this.angularFireStore.collection('comments');
    this.commentsCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        })),
        map((comments: Comment[]) => {
          return comments.sort((previous, current) =>
            compareAsc(previous.date, current.date),
          );
        })
      ).subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

  showMenu(comment: CommentWithAction): void {
    const resetCommentStateIfNeeded = (currentComment: CommentWithAction) => {
      return (originComment: CommentWithAction) => {
        if (originComment.id !== currentComment.id) {
          originComment.isShowMenu = false;
          originComment.isHover = false;
        }
      };
    };
    this.comments.forEach(resetCommentStateIfNeeded(comment));
    comment.isShowMenu = !comment.isShowMenu;
  }

  startEdit(comment: CommentWithAction): void {
    comment.isEdit = true;
    comment.isShowMenu = false;
  }

  startDelete(comment: CommentWithAction): void {
    comment.isShowMenu = false;
    this.commentsCollection.doc(comment.id).delete();
  }

  updateComment(id: string): void {
    const element: HTMLElement = this.elementRef.nativeElement;
    const editedMessage: string = element.getElementsByTagName('input')[0].value;
    this.commentsCollection.doc(id).update({
      message: editedMessage,
    });
  }
}
