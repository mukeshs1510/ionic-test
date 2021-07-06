import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DantistsPage } from './dantists.page';

const routes: Routes = [
  {
    path: '',
    component: DantistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DantistsPageRoutingModule {}
