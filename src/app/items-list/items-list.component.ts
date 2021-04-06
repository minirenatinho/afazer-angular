import { Component, OnInit } from '@angular/core';

import { AfazerApiService } from '../afazer-api.service'

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: any

  constructor(private afazerApi: AfazerApiService) { }

  ngOnInit(): void {
    this.listItems();
  }

  listItems(){
    this.afazerApi.listItems().subscribe(items => this.itemsList = items);
  }

}
