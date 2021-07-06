import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddentistPageRoutingModule } from './adddentist-routing.module';

import { AdddentistPage } from './adddentist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddentistPageRoutingModule
  ],
  declarations: [AdddentistPage]
})
export class AdddentistPageModule {}
