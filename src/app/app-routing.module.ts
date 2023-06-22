import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from './auth/guards/is-logged.guard';
import { HasRoleGuard } from './auth/guards/has-role.guard';


const routes: Routes = [
  {
    path:'gestion-recursos',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    loadChildren:() => import('./resource-management/resource-management.module').then(m=>m.ResourceManagementModule)
  },
  {
    path:'gestion-copias',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    loadChildren:() => import('./copy-management/copy-management.module').then(m=>m.CopyManagementModule)
  },
  {
    path:'login',
    loadChildren:() => import ('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'gestion-usuarios',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Admin'
    },
    loadChildren:() => import ('./user-management/user-management.module').then(m=>m.UserManagementModule)
  },

  {
    path: 'historico',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    loadChildren: () => import('./historic-search/historic-search.module').then(m => m.HistoricSearchModule)
  },
  {
    path: 'gestion-transacciones',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    loadChildren: () => import('./transaction-management/transaction-management.module').then(m => m.TransactionManagementModule)

  },
  {
    path: 'usuarios-biblioteca',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'User'
    },
    loadChildren: () => import('./user-library-client/user-library-client.module').then(m => m.UserLibraryClientModule)
  },
  {
    path: 'gestion-sanciones',
    canActivate:[IsLoggedGuard,HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    loadChildren: () => import('./penalty-management/penalty-management.module').then(m => m.PenaltyManagementModule)
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },

  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
