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
  {
    path: 'institucional',
    loadChildren: () =>
      import('./pages/institucional/institucional.module').then(
        (m) => m.InstitucionalModule,
      ),
  },

  {
    path: 'sistema',
    component: LayoutComponent,
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

      {
        path: 'planejamento',
        loadChildren: () =>
          import('./features/planejamento/planejamento.module').then(
            (m) => m.PlanejamentoModule,
          ),
      },
      {
        path: 'cartoes',
        loadChildren: () =>
          import('./features/cartoes/cartoes.module').then(
            (m) => m.CartoesModule,
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('./features/perfil/perfil.module').then((m) => m.PerfilModule),
        canActivate: [authGuard],
      },
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
