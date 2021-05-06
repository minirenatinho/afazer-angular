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

  contextItemsList: Array<Array<Item>> = [[]];
  contextColorMap: { context: Array<string>, color: Array<string> } = { context: [], color: [] };
  separateItems: boolean = true;

  constructor(
    private afazerApi: AfazerApiService,
    private dialog: MatDialog
  ) {
    this.contextColorMap = {
      context: ['default', 'casa', 'estudo'],
      color: ['orange', 'yellow', 'red']
    };
  }

  ngOnInit(): void {
    this.listItems();
  }

  listItems(){
    this.afazerApi.listItems().subscribe(items => {
      this.contextItemsList = [[]];
      let index = 1;
      let found = false;
      items.result.map(item => {
        item.createdAt = new Date(item.createdAt!).toLocaleDateString('pt-br');
        item.updatedAt = new Date(item.updatedAt!).toLocaleDateString('pt-br');

        //clustering items by context
        if (!item.context){
          this.contextItemsList[0].push(item);
        } else {
          for(let i=1; i<=index; ++i){
            if (!found && this.contextItemsList[i] && this.contextItemsList[i][0].context == item.context){
              this.contextItemsList[i].push(item);
              found = true;
            }
          }
          if(!found){
            this.contextItemsList[index] = [];
            this.contextItemsList[index].push(item);
            ++index;
          }
        }
        found = false;
      });

      this.contextItemsList = this.contextItemsList.reverse();
    });
  }

  addItem(){
    const refDialog = this.dialog.open(AddItemModalComponent, {
      disableClose: true,
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

  stylizeList(): string{
    if(this.separateItems) return 'flow-root';
    return 'blocks';
  }

  stylizeItem(context?: string ): string{
    let color = this.contextColorMap.color[0];

    this.contextColorMap.context.map((value, index, array) => {
      if(value == context) color = this.contextColorMap.color[index];
    });

    return color;
  }

  changeItemsOrganization() {
    this.separateItems = !this.separateItems;
    this.listItems();
  }

}
