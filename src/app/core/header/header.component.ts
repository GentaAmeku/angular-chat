import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoginState: boolean;

  constructor(
    private route: Router,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      user ? (this.isLoginState = true) : (this.isLoginState = false);
    });
  }

  startLogout(): void {
    this.authService.logout();
  }

  goToLogin(): void {
    this.route.navigate(['/login']);
  }
}
