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
    ],
  },

  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
