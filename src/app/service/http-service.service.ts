import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  baseUrl: string = 'https://api.pexels.com/videos/popular?per_page=1';
  
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.apiKey
    })
  };

  constructor(private http: HttpClient) { }

  fetchVideos = () => {
    return this.http.get(`${this.baseUrl}`, this.httpOption)
  }
}
