import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ListItemsResponse } from './list-items-response';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class AfazerApiService {
  apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) { }

  listItems() {
    return this.http.get<ListItemsResponse>(this.apiUrl, { headers: new HttpHeaders({'id': '5d3f4c7ab72b5a001727317a', 'token': '1d58c5b5-66d9-43d9-92db-c799c1d79363'})});
  }

  addItem(item: Item) {
    return this.http.post(this.apiUrl, item, { headers: new HttpHeaders({'id': '5d3f4c7ab72b5a001727317a', 'token': '1d58c5b5-66d9-43d9-92db-c799c1d79363'})});
  }

  editItem(item: Item) {
    return this.http.patch(this.apiUrl+'/'+item._id, item, { headers: new HttpHeaders({'id': '5d3f4c7ab72b5a001727317a', 'token': '1d58c5b5-66d9-43d9-92db-c799c1d79363'})});
  }

  deleteItem(itemId: string) {
    return this.http.delete(this.apiUrl+'/'+itemId, { headers: new HttpHeaders({'id': '5d3f4c7ab72b5a001727317a', 'token': '1d58c5b5-66d9-43d9-92db-c799c1d79363'})});
  }
}
