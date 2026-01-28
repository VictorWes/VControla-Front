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
import { CartaoDialogComponent } from './components/cartao-dialog/cartao-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { PagamentoDialogComponent } from './components/pagamento-dialog/pagamento-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompraDialogComponent } from './components/compra-dialog/compra-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion'; // Para o Accordion

@NgModule({
  declarations: [
    CartoesViewComponent,
    CartaoDialogComponent,
    PagamentoDialogComponent,
    CompraDialogComponent,
  ],
  imports: [
    CommonModule,
    CartoesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
})
export class CartoesModule {}
