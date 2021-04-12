import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { Item } from '../item';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() titleInput: string = '';
  itemsList: Array<Item> = [];

  constructor(
    private afazerApi: AfazerApiService,
    private dialog: MatDialog
  ) { }

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
    this.afazerApi.addItem(this.titleInput).subscribe(() => {
      this.listItems();
      this.titleInput = '';
    });
  }

  editItem(){
    this.dialog.open(EditItemModalComponent, {
      width: '100%',
      height: '100px'
    });
  }

  deleteItem(itemId: string){
    this.afazerApi.deleteItem(itemId).subscribe(() => this.listItems());
  }

}
