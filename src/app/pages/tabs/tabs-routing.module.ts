import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
          path: 'home',
          loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('../patients/patients.module').then( m => m.PatientsPageModule)
    },
    {
      path: 'dentist',
      loadChildren: () => import('../dantists/dantists.module').then( m => m.DantistsPageModule)
  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
