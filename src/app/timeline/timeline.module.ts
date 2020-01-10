import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TimelineComponent } from './timeline/timeline.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    SharedModule,
    TimelineRoutingModule,
  ],
  declarations: [
    ChatComponent,
    UserListComponent,
    TimelineComponent,
    FormComponent
  ]
})
export class TimelineModule { }
