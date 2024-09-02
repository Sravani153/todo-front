import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../components/todo-app/model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/todo/api/v1/user';

  constructor(private http: HttpClient) {}

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/add`, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}`, item);
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/`);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBookmarkedItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/bookmarked`);
  }

  toggleBookmark(id: string, bookmarked: boolean): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/${id}/toggleBookmark`, { bookmarked });
  }

  searchItems(searchTerm: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/search`, { params: { searchTerm } });
  }

}

