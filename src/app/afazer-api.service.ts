import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AfazerApiService {
  apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) { }

  listItems() {
    return this.http.get(this.apiUrl, { headers: new HttpHeaders({'id': '5d3f4c7ab72b5a001727317a', 'token': '1d58c5b5-66d9-43d9-92db-c799c1d79363'}) });
  }
}
