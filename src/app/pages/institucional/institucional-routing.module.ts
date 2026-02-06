import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionalLayoutComponent } from './institucional-layout/institucional-layout.component';
import { TermosComponent } from './termos/termos.component';
import { PrivacidadeComponent } from './privacidade/privacidade.component';
import { SuporteComponent } from './suporte/suporte.component';

const routes: Routes = [
  {
    path: '',
    component: InstitucionalLayoutComponent,
    children: [
      { path: 'termos', component: TermosComponent },
      { path: 'privacidade', component: PrivacidadeComponent },
      { path: 'suporte', component: SuporteComponent },
      { path: '', redirectTo: 'termos', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionalRoutingModule {}
