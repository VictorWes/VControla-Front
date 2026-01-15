import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, MatIconModule],
})
export class DashboardModule {}
