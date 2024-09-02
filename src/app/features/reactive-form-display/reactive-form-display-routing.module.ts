import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormDisplayComponent } from './reactive-form-display.component';

const routes: Routes = [{ path: '', component: ReactiveFormDisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormDisplayRoutingModule { }
