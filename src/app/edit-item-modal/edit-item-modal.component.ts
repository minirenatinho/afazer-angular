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
  @Input() descriptionInput?: string;
  @Input() contextInputModal?: string;

  constructor(
    private afazerApi: AfazerApiService,
    private matDialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }) {
      this.titleInput = data.item.title;
      this.descriptionInput = data.item.description;
      this.contextInputModal = data.item.context;
    }

  ngOnInit(): void {
  }

  saveChanges(){
    this.data.item.title = this.titleInput;
    this.data.item.description = this.descriptionInput;
    this.data.item.context = this.contextInputModal;

    this.afazerApi.editItem(this.data.item).subscribe(() => {
      this.matDialogRef.close();
    });
  }

  discardChanges() {
    this.matDialogRef.close();
  }

  deleteItem() {
    this.data.item.title = this.titleInput;
    this.data.item.description = this.descriptionInput;
    this.data.item.context = this.contextInputModal;

    this.afazerApi.deleteItem(this.data.item._id!).subscribe(() => {
      this.matDialogRef.close();
    });
  }

}
