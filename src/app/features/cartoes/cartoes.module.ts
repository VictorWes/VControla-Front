import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartoesRoutingModule } from './cartoes-routing.module';
import { CartoesViewComponent } from './pages/cartoes-view/cartoes-view.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({

  declarations: [CartoesViewComponent],
  imports: [
    CommonModule,
    CartoesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
})
export class CartoesModule {}
