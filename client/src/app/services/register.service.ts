import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  postUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }
}
