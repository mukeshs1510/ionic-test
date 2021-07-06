import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DantistsPageRoutingModule } from './dantists-routing.module';

import { DantistsPage } from './dantists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DantistsPageRoutingModule
  ],
  declarations: [DantistsPage]
})
export class DantistsPageModule {}
