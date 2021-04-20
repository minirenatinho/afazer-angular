import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { Item } from '../item';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: Array<Item> = [];
  contextItemsList: Array<Array<Item>> = [[]];

  constructor(
    private afazerApi: AfazerApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listItems();
  }

  listItems(){
    this.afazerApi.listItems().subscribe(items => {

      let index = 0;
      let found = false;
      items.result.map(item => {
        item.createdAt = new Date(item.createdAt!).toLocaleDateString();
        item.updatedAt = new Date(item.updatedAt!).toLocaleDateString();

        //clustering items by context
        if (!item.context){
          this.contextItemsList[0].push(item);
        } else {
          for(let i=0; i<index; ++i){
            console.log(this.contextItemsList[i][0]);
            console.log(item.context)
            if (!found && this.contextItemsList[i][0].context == item.context){
              this.contextItemsList[i].push(item);
              found = true;
            }
          }
          if(!found){
            ++index;
            this.contextItemsList[index] = [];
            this.contextItemsList[index].push(item);
          }
        }
      });
      console.log(this.contextItemsList);
      this.itemsList = items.result.reverse();
    });
  }

  addItem(){
    const refDialog = this.dialog.open(AddItemModalComponent, {
      width: '100%',
      panelClass: 'custom-dialog-container'
    });

    refDialog.afterClosed().subscribe(() => {
      this.listItems();
    });
  }

  editItem(item: Item){
    const refDialog = this.dialog.open(EditItemModalComponent, {
      disableClose: true,
      width: '100%',
      panelClass: 'custom-dialog-container',
      data: { item }
    });

    refDialog.afterClosed().subscribe(() => {
      this.listItems();
    });
  }

}
