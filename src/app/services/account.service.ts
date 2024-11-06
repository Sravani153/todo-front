import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AccountDTO } from '../model/AccountDTO';
import { UserstorageService } from '../storage/userstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `${environment.apiBaseUrl}/accounts`;


  constructor(
    private http: HttpClient,
    private userStorageServ: UserstorageService

  ) { }

createAccount(account: AccountDTO): Observable<AccountDTO> {
  return this.http.post<AccountDTO>(`${this.baseUrl}/add`, account, {
      headers: { 'Content-Type': 'application/json' }
  });
}

getAllAccounts(): Observable<AccountDTO[]> {
  return this.http.get<AccountDTO[]>(`${this.baseUrl}/`);
}

deleteAccount(email: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/delete/${email}`);
}

getProfile(): Observable<AccountDTO> {
  return this.http.get<AccountDTO>(`${this.baseUrl}/profile`);
}

updateProfile(profile: AccountDTO): Observable<AccountDTO> {
  return this.http.put<AccountDTO>(`${this.baseUrl}/profile/update`, profile);
}

getAccountByEmail(email: string): Observable<AccountDTO> {
  return this.http.get<AccountDTO>(`${this.baseUrl}/${email}`);
}

private createAuthorizationHeader(): HttpHeaders {
  const token = this.userStorageServ.getToken();
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

}
