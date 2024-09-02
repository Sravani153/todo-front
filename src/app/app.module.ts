import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { ChildComponent } from './components/child/child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { DataBindingModule } from './features/data-binding/data-binding.module';
import { DirectivesModule } from './features/directives/directives.module';
import { AddItemModule } from './features/todo/add-item/add-item.module';
import { BookmarkModule } from './features/todo/bookmark/bookmark.module';
import { ItemListModule } from './features/todo/item-list/item-list.module';
import { IntroductionModule } from './features/introduction/introduction.module';





@NgModule({
  declarations: [
    AppComponent,
    ComponentCommunicationComponent,
    LifecycleComponent,
    ChildComponent,
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,

    DataBindingModule,
    DirectivesModule,
    AddItemModule,
    BookmarkModule,
    ItemListModule,
    IntroductionModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
