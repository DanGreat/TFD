import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  APP_ID = 569824943903316;
  // const APP_SECRET = ;
  // tslint:disable-next-line: max-line-length
  ACCESS_TOKEN = 'EAAIGQLVdklQBAM5yz5J5biub3LUhD5BQlS2twrML1b4cNZBZAK3TLxVoOEIR6UkCJo5xXkvqNBb9ubK2GiVPaEPZBDQPtGDvpymxFsCXfdFD3O8elLfWPOQgiEDmHSZAfppNSJL8WVsZAJ8NLW0bi7nmZB4DCBMJOiohwlgFAvbYmHRPKNzigH';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // generateToken = () => {
  //   this.http.get('https://graph.facebook.com/v7.0/oauth/access_token?
  //   grant_type=fb_exchange_token&
  //   client_id={APP_ID}&
  //   client_secret={APP_SECRET}&
  //   fb_exchange_token={SHORT_LIVED_ACCESS_TOKEN}');
  // }

  fetchVideos = () => {
    return this.http.get(`https://graph.facebook.com/2419659631668347/videos/uploaded?fields=id,created_time,thumbnails{uri},icon,source,title,description&access_token=${this.ACCESS_TOKEN}`);

  }
}
