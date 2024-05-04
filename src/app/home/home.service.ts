import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeApiResponse } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private http = inject(HttpClient);
  //private baseUrl = 'http://localhost:8080';
  private baseUrl = 'http://localhost:5280';

  getData():Observable<HomeApiResponse> {
    const apiUrl = this.baseUrl + "/api/Home";
    return this.http.get<HomeApiResponse>(apiUrl);
  }

  constructor() { }
}
