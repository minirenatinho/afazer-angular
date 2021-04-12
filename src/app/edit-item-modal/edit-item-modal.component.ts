import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.css']
})
export class EditItemModalComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<EditItemModalComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.matDialogRef.close();
  }

}
