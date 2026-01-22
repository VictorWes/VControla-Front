import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanejamentoViewComponent } from './pages/planejamento-view/planejamento-view.component';

const routes: Routes = [
  {
    path: '',
    component: PlanejamentoViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanejamentoRoutingModule {}
