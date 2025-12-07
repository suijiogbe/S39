import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 's39_token';
  private apiBase = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      '/api/login',
      { username, password }
    ).pipe(
      tap(res => {
        if (res && (res as any).token) {
          localStorage.setItem(this.tokenKey, (res as any).token);
        }
      })
    );
  }

  // login(username: string, password: string) {
  //   return this.http.post<{ success: boolean; token?: string }>('/api/login', { username, password });
  // }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getTokenExpiration(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
      const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  isTokenExpired(token?: string): boolean {
    const t = token || this.getToken();
    if (!t) return true;
    const payload = this.getTokenExpiration(t);
    if (!payload || !payload.exp) return true;
    return Math.floor(Date.now() / 1000) >= payload.exp;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }
}
