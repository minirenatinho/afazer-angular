import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ListItemsResponse } from './list-items-response';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class AfazerApiService {
  apiUrl = 'https://afazer-api.herokuapp.com/api/items';
  apiUrlDev = 'http://localhost:3000/api/items';
  userId = '5d3f4c7ab72b5a001727317a';
  userToken = '1d58c5b5-66d9-43d9-92db-c799c1d79363';

  constructor(private http: HttpClient) { }

  listItems() {
    return this.http.get<ListItemsResponse>(this.apiUrl, { headers: new HttpHeaders({'id': this.userId, 'token': this.userToken})});
  }

  addItem(item: Item) {
    return this.http.post(this.apiUrl, item, { headers: new HttpHeaders({'id': this.userId, 'token': this.userToken})});
  }

  editItem(item: Item) {
    return this.http.patch(this.apiUrl+'/'+item._id, item, { headers: new HttpHeaders({'id': this.userId, 'token': this.userToken})});
  }

  deleteItem(itemId: string) {
    return this.http.delete(this.apiUrl+'/'+itemId, { headers: new HttpHeaders({'id': this.userId, 'token': this.userToken})});
  }
}
