import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilViewComponent } from './pages/perfil-view/perfil-view.component';



const routes: Routes = [
  { path: '', component: PerfilViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
