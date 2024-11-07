import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { CustomTableModule } from '../custom-table/custom-table.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NavbarModule } from '../todo/navbar/navbar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    CustomTableModule,
    MatTableModule,
    MatPaginatorModule,
    NavbarModule,
    MatProgressSpinnerModule
  ]
})
export class AccountsModule { }
