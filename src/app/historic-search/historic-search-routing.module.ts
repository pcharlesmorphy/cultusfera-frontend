import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarLibrarianPageComponent } from '../shared/components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { HistoricByResourcePageComponent } from './pages/historic-by-resource-page/historic-by-resource-page.component';
import { HistoricByUserPageComponent } from './pages/historic-by-user-page/historic-by-user-page.component';


const routes: Routes = [
  {
    path: '',
    component: MenuBarLibrarianPageComponent,
    children: [
      { path:'por-recurso', component:HistoricByResourcePageComponent},
      { path:'por-usuario', component:HistoricByUserPageComponent}
    ],
  },
      { path:'**',redirectTo:''}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricSearchRoutingModule { }
