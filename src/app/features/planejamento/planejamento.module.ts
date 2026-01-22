import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanejamentoRoutingModule } from './planejamento-routing.module';
import { PlanejamentoViewComponent } from './pages/planejamento-view/planejamento-view.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [PlanejamentoViewComponent],
  imports: [
    CommonModule,
    PlanejamentoRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class PlanejamentoModule {}
