import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { ContaListaComponent } from './contas/pages/conta-lista/conta-lista.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    pathMatch: 'full',
  },

  {
    path: 'contas',
    component: ContaListaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
