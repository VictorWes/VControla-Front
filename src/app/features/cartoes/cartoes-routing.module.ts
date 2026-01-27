import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartoesViewComponent } from './pages/cartoes-view/cartoes-view.component';

const routes: Routes = [{ path: '', component: CartoesViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartoesRoutingModule {}
