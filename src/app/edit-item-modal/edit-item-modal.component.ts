import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { DeleteItemModalComponent } from '../delete-item-modal/delete-item-modal.component';
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
    private dialog: MatDialog,
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

  openDeleteModal() {
    const refDialog = this.dialog.open(DeleteItemModalComponent, {
      disableClose: true,
      width: '50%',
      panelClass: 'custom-dialog-container',
      data: this.data
    });

    refDialog.afterClosed().subscribe(result => {
      if(result == 'delete') this.matDialogRef.close();
    });
  }

}
