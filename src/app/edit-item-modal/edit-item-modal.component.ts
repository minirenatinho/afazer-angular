import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { Item } from '../item';

@Component({
  selector: 'edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements OnInit {

  @Input() titleInput: string;

  constructor(
    private afazerApi: AfazerApiService,
    private matDialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }) {
      this.titleInput = data.item.title;
    }

  ngOnInit(): void {
  }

  saveChanges(){
    this.data.item.title = this.titleInput;

    this.afazerApi.editItem(this.data.item).subscribe(() => {
      this.matDialogRef.close();
    });
  }

  discartChanges() {
    this.matDialogRef.close();
  }

}
