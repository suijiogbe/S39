import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit(e: Event) {
    e.preventDefault();
    this.error = null;
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('jwt', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.error = err?.error?.err || err?.message || 'Login failed';
      }
    });
  }
}
