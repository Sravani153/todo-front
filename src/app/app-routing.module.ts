import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifecycleComponent } from './components/lifecycle/lifecycle.component';
import { AuthGuard } from './route-guard/auth.guard';


const routes: Routes = [
  { path: 'intro', loadChildren: () => import('./features/introduction/introduction.module').then(m => m.IntroductionModule) },
  {
    path: 'list',
    loadChildren: () => import('./features/todo/item-list/item-list.module').then(m => m.ItemListModule),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'USER'] }
  },
  { path: 'bookmark', loadChildren: () => import('./features/todo/bookmark/bookmark.module').then(m => m.BookmarkModule) },
  { path: 'add', loadChildren: () => import('./features/todo/add-item/add-item.module').then(m => m.AddItemModule), canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'edit/:id', loadChildren: () => import('./features/todo/add-item/add-item.module').then(m => m.AddItemModule) , canActivate: [AuthGuard], data: { role: 'ADMIN' }},
 { path: 'directives', loadChildren: () => import('./features/directives/directives.module').then(m => m.DirectivesModule) },
 { path: 'data-binding', loadChildren: () => import('./features/data-binding/data-binding.module').then(m => m.DataBindingModule) },
 { path: 'reactive-form', loadChildren: () => import('./features/reactive-form/reactive-form.module').then(m => m.ReactiveFormModule) },
 {path: 'lifecycle', component:LifecycleComponent},
 { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/todo/login/login.module').then(m => m.LoginModule) },
  { path: 'navbar', loadChildren: () => import('./features/todo/navbar/navbar.module').then(m => m.NavbarModule) },
  { path: 'profile', loadChildren: () => import('./features/todo/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'signup', loadChildren: () => import('./features/todo/signup/signup.module').then(m => m.SignupModule) },
  { path: 'custom-table', loadChildren: () => import('./features/custom-table/custom-table.module').then(m => m.CustomTableModule) },
  { path: 'accounts', loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
