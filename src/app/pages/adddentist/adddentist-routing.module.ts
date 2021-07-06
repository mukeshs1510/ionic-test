import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddentistPage } from './adddentist.page';

const routes: Routes = [
  {
    path: '',
    component: AdddentistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddentistPageRoutingModule {}
