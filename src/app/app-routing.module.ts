import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'dentist',
    loadChildren: () => import('./pages/dantists/dantists.module').then( m => m.DantistsPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./pages/patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'patient/:id',
    loadChildren: () => import('./pages/patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'addpatient',
    loadChildren: () => import('./pages/addpatient/addpatient.module').then( m => m.AddpatientPageModule)
  },
  {
    path: 'addpatient/:id',
    loadChildren: () => import('./pages/addpatient/addpatient.module').then( m => m.AddpatientPageModule)
  },
  {
    path: 'adddentist',
    loadChildren: () => import('./pages/adddentist/adddentist.module').then( m => m.AdddentistPageModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./pages/favourites/favourites.module').then( m => m.FavouritesPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
