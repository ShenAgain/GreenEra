import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private isAuthenticated = new BehaviorSubject<boolean>(false);
    private userRole = new BehaviorSubject<string>('');
    private userId = new BehaviorSubject<string | null>(null);
    private fullName = new BehaviorSubject<string>('');
    
    constructor(private http: HttpClient) {}
  
    login(email: string, password: string, role: string): Observable<any> {
      return this.http.post<{token: string, userId: string}>(`${this.apiUrl}/login`, { email, password, role }).pipe(
        tap(response => {
          this.isAuthenticated.next(true);
          this.userId.next(response.userId);
          this.fullName.next(response.fullName);
        })
      );
    }
  
    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, userData);
    }
  
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.fullName.next('');
      this.isAuthenticated.next(false);
      this.userRole.next('null');
      this.userId.next(null);
    }
  
    isAuth() {
      return this.isAuthenticated.asObservable();
    }
  
    getUserRole() {
      return this.userRole.asObservable();
    }

    getUserId(): Observable<string | null> {
      return this.userId.asObservable();
    }

    getFullName(): Observable<string> {
      return this.fullName.asObservable();
    }
  }