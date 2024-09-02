import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormRoutingModule } from './reactive-form-routing.module';
import { ReactiveFormComponent } from './reactive-form.component';
import { ReactiveFormDisplayModule } from '../reactive-form-display/reactive-form-display.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReactiveFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormDisplayModule,
  ]
})
export class ReactiveFormModule {

 }
