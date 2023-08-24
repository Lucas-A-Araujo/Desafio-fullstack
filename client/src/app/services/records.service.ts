import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private apiUrl = 'http://localhost:3000/users/all';
  //private apiUrl = 'https://randomuser.me/api/?results=10';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.apiUrl);
  }
}
