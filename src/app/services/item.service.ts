import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model';
import { environment } from '../environments/environment';
import { UserstorageService } from '../storage/userstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = `${environment.apiBaseUrl}/api/users`;


  constructor(private http: HttpClient, private userStorageServ: UserstorageService) {}

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/add`, item, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}`, item, {
      headers: this.createAuthorizationHeader()
    });
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`,{
      headers: this.createAuthorizationHeader()
    });
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteItems(ids: string[]): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete`, {
        headers: this.createAuthorizationHeader(),
        body: ids
    });
}

  getBookmarkedItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/bookmarked`, {
      headers: this.createAuthorizationHeader()
    });
  }

  toggleBookmark(id: string, bookmarked: boolean): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}/toggleBookmark`, { bookmarked }, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchItems(searchTerm: string): Observable<Item[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<Item[]>(`${this.baseUrl}/search`, {
      headers: this.createAuthorizationHeader(),
      params: params
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.userStorageServ.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

}

