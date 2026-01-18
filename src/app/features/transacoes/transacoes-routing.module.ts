import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransacaoListaComponent } from './pages/transacao-lista/transacao-lista.component';

const routes: Routes = [
  {
    path: '',
    component: TransacaoListaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransacoesRoutingModule {}
