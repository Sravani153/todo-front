import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { ComponentCommunicationComponent } from './components/component-communication/component-communication.component';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { ReactiveFormsComponent } from './components/reactive-forms/reactive-forms.component';
import { ItemListComponent } from './components/todo-app/item-list/item-list.component';
import { AddItemComponent } from './components/todo-app/add-item/add-item.component';
import { BookmarkComponent } from './components/todo-app/bookmark/bookmark.component';


const routes: Routes = [
  { path: 'data-binding', component: DataBindingComponent },
  { path: 'directives', component: DirectivesComponent },
  { path: 'component-communication', component: ComponentCommunicationComponent },
  { path: 'lifecycle', component: LifecycleComponent },
  { path: 'reactive-forms', component: ReactiveFormsComponent },
  {path:'list', component:ItemListComponent},
  {path:'bookmark', component:BookmarkComponent},
  {path: 'add',component:AddItemComponent},
  {path:'edit/:id',component:AddItemComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
