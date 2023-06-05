import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarAdminPageComponent } from '../shared/components/layouts/menubar-admin-page/menubar-admin-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';

const routes: Routes = [
  {
    path: '',
    component: MenubarAdminPageComponent,
    children: [
      {
          path:'usuarios', children:[
            { path: 'crear', component: NewUserPageComponent },
            { path: 'listar', component: ListUsersPageComponent}
          ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
