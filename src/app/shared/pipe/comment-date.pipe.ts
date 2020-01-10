import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import * as ja from 'date-fns/locale/ja';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  transform(date: string): string {
    if (!date) {
      return void 0;
    }
    return format(date, 'YYYY年MMMDo H:mm', { locale: ja });
  }

}
