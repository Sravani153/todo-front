import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';


const routes: Routes = [
  { path: 'intro', loadChildren: () => import('./features/introduction/introduction.module').then(m => m.IntroductionModule) },
  { path: 'list', loadChildren: () => import('./features/todo/item-list/item-list.module').then(m => m.ItemListModule) },
  { path: 'bookmark', loadChildren: () => import('./features/todo/bookmark/bookmark.module').then(m => m.BookmarkModule) },
  { path: 'add', loadChildren: () => import('./features/todo/add-item/add-item.module').then(m => m.AddItemModule) },
  { path: 'edit/:id', loadChildren: () => import('./features/todo/add-item/add-item.module').then(m => m.AddItemModule) },
 { path: 'directives', loadChildren: () => import('./features/directives/directives.module').then(m => m.DirectivesModule) },
 { path: 'data-binding', loadChildren: () => import('./features/data-binding/data-binding.module').then(m => m.DataBindingModule) },
 { path: 'reactive-form', loadChildren: () => import('./features/reactive-form/reactive-form.module').then(m => m.ReactiveFormModule) },
 {path: 'lifecycle', component:LifecycleComponent},
 { path: '', redirectTo: '/intro', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
