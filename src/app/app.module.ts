import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { EditItemModalComponent } from './edit-item-modal/edit-item-modal.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import { DeleteItemModalComponent } from './delete-item-modal/delete-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    EditItemModalComponent,
    AddItemModalComponent,
    DeleteItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
