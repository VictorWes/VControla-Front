import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './template/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { redirectGuard } from './core/guards/redirect.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', canActivate: [redirectGuard], children: [] },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },

  // --- AQUI É A "CASINHA" DO SISTEMA (COM LAYOUT) ---
  {
    path: 'sistema',
    component: LayoutComponent, // <--- ESSE CARA QUE TRAZ O HEADER E O MENU
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'transacoes',
        loadChildren: () =>
          import('./features/transacoes/transacoes.module').then(
            (m) => m.TransacoesModule,
          ),
      },

      // --- MUDANÇA: O PLANEJAMENTO VEM PARA CÁ (DENTRO DO CHILDREN) ---
      {
        path: 'planejamento',
        loadChildren: () =>
          import('./features/planejamento/planejamento.module').then(
            (m) => m.PlanejamentoModule,
          ),
      },
    ],
  },

  // O Wildcard deve ser a última coisa
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
