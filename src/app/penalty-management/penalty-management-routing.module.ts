import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarLibrarianPageComponent } from '../shared/components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';


const routes: Routes = [
  {
    path:'',
    component:MenuBarLibrarianPageComponent,
    children: [
      {
        path:'usuarios', children: [
          {path:'listar',component:ListUserPageComponent}
        ],
      },
      { path:'**',redirectTo:'copias'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltyManagementRoutingModule { }
