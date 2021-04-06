import { Component, Input, OnInit } from '@angular/core';

import { AfazerApiService } from '../afazer-api.service';
import { Item } from '../item';
import { ListItemsResponse } from '../list-items-response';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() titleInput: string = '';
  itemsList: Array<Item> = [];

  constructor(private afazerApi: AfazerApiService) { }

  ngOnInit(): void {
    this.listItems();
  }

  listItems(){
    this.afazerApi.listItems().subscribe(items => {
      items.result.map(item => {
        item.createdAt = new Date(item.createdAt).toLocaleDateString();
        item.updatedAt = new Date(item.updatedAt).toLocaleDateString();
      });
      this.itemsList = items.result.reverse();
    });
  }

  addItem(){
    this.afazerApi.addItem(this.titleInput).subscribe(() => this.listItems());
  }

  deleteItem(itemId: string){
    this.afazerApi.deleteItem(itemId).subscribe(() => this.listItems());
  }

}
