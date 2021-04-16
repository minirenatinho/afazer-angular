import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AfazerApiService } from '../afazer-api.service';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.css']
})
export class AddItemModalComponent implements OnInit {

  @Input() titleInput: string = '';
  @Input() descriptionInput?: string = '';

  constructor(
    private afazerApi: AfazerApiService,
    private matDialogRef: MatDialogRef<EditItemModalComponent>) { }

  ngOnInit(): void {
  }

  save(){
    this.afazerApi.addItem({ title: this.titleInput, email: 'email', description: this.descriptionInput }).subscribe(() => {
      this.matDialogRef.close();
    });
  }

  discard() {
    this.matDialogRef.close();
  }

}
