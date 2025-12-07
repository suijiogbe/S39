import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
