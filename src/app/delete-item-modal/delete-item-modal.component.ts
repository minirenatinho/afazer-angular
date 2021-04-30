import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { Item } from '../item';

@Component({
  selector: 'app-delete-item-modal',
  templateUrl: './delete-item-modal.component.html',
  styleUrls: ['./delete-item-modal.component.css']
})
export class DeleteItemModalComponent implements OnInit {

  constructor(
    private afazerApi: AfazerApiService,
    private matDialogRef: MatDialogRef<DeleteItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.matDialogRef.close('cancel');
  }

  deleteItem() {
    this.afazerApi.deleteItem(this.data.item._id!).subscribe(() => {
      this.matDialogRef.close('delete');
    });
  }

}
