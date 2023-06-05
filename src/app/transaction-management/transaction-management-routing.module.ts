import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarLibrarianPageComponent } from '../shared/components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { MakeTransactionPageComponent } from './pages/make-transaction-page/make-transaction-page.component';


const routes: Routes = [
  {
    path: '',
    component: MenuBarLibrarianPageComponent,
    children: [
      { path:'', component:MakeTransactionPageComponent},
    ],
  },
  { path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionManagementRoutingModule { }



