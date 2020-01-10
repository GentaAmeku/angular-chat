import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  declarations: [
    UserDetailComponent,
  ]
})
export class UsersModule { }
