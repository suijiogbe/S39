import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiBase = '';
  private backendOrigin = 'http://localhost:3000';

  constructor(private auth: AuthService) {}

  private headers() {
    const token = this.auth.getToken();
    const h: any = { 'Content-Type': 'application/json' };
    if (token) h['Authorization'] = 'Bearer ' + token;
    return h;
  }

  async getChart1() {
    const res = await fetch((this.apiBase || this.backendOrigin) + '/api/chart1', { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch chart1');
    return await res.json();
  }

  async getChart2() {
    const res = await fetch((this.apiBase || this.backendOrigin) + '/api/chart2', { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch chart2');
    return await res.json();
  }

  // async getChart1() {
  //   const res = await fetch(`${this.apiBase}/chart1`, { headers: this.headers() });
  //   if (!res.ok) throw new Error('Failed to fetch chart1');
  //   return await res.json();
  // }

  // async getChart2() {
  //   const res = await fetch(`${this.apiBase}/chart2`, { headers: this.headers() });
  //   if (!res.ok) throw new Error('Failed to fetch chart2');
  //   return await res.json();
  // }

}
