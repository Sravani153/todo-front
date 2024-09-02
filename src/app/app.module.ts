import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ChildComponent } from './components/child/child.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormDisplayComponent } from './components/reactive-form-display/reactive-form-display.component';

import { MaskPipePipe } from './pipes/mask-pipe.pipe';
import { CustomPipe } from './pipes/custom.pipe';

import { ItemListComponent } from './components/todo-app/item-list/item-list.component';
import { AddItemComponent } from './components/todo-app/add-item/add-item.component';

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
import { BookmarkComponent } from './components/todo-app/bookmark/bookmark.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {  MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    DataBindingComponent,
    DirectivesComponent,
    ComponentCommunicationComponent,
    LifecycleComponent,
    ReactiveFormsComponent,
    ChildComponent,
    CustomPipe,
    ReactiveFormDisplayComponent,
    MaskPipePipe,
    ItemListComponent,
    AddItemComponent,
    BookmarkComponent,
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
    HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
