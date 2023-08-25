import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserByName(name: string) {
    return this.http.get(`${this.apiUrl}/name/${name}`);
  }

  changeUserStatus(id: string, status: boolean) {
    return this.http.patch(`${this.apiUrl}/${id}/validar`, { status: status });
  }
}
