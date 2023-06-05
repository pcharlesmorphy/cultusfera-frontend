import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarLibrarianPageComponent } from '../shared/components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { AddNewCopyPageComponent } from './pages/add-new-copy-page/add-new-copy-page.component';

// localhost:4200/gestion-recursos

const routes: Routes = [
  {
    path:'',
    component:MenuBarLibrarianPageComponent,
    children: [
      {
        path:'copias', children: [
          {path:'anadir',component:AddNewCopyPageComponent}
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
export class CopyManagementRoutingModule { }
