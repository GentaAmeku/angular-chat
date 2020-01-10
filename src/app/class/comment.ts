import { User } from './user';
import { format } from 'date-fns';

export class Comment {
  user: User;
  initial: string;
  message: string;
  date: string;
  id?: string;

  constructor(user: User, message: string) {
    this.user = user;
    this.initial = user.displayName.slice(0, 1);
    this.message = message;
    this.date = format(new Date());
  }
}
