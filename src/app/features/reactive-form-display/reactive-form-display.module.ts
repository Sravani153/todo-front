import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormDisplayRoutingModule } from './reactive-form-display-routing.module';
import { ReactiveFormDisplayComponent } from './reactive-form-display.component';
import { CustomPipe } from 'src/app/pipes/custom.pipe';
import { MaskPipePipe } from 'src/app/pipes/mask-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReactiveFormDisplayComponent,
    CustomPipe,
    MaskPipePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormDisplayRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ] ,
   exports: [
    ReactiveFormDisplayComponent
  ]
})
export class ReactiveFormDisplayModule { }
