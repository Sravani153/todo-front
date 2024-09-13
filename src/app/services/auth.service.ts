import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, throwError, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { UserstorageService } from '../storage/userstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStorageServ: UserstorageService
  ) { }

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, body, { headers }).pipe(
      map((response) => {
        if (response.token) {
          this.userStorageServ.storeToken(response.token);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

}
