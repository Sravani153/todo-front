import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '../navbar/navbar.module';
import { NavbarComponent } from '../navbar/navbar.component';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NavbarModule,
    MatCardModule,
    MatIconModule,
  ],
  exports:[NavbarComponent]
})
export class ProfileModule { }
