import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransacoesRoutingModule } from './transacoes-routing.module';
import { TransacaoListaComponent } from './pages/transacao-lista/transacao-lista.component';
import { TransacaoCadastroComponent } from './components/transacao-cadastro/transacao-cadastro.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TransacaoListaComponent, TransacaoCadastroComponent],
  imports: [
    CommonModule,
    TransacoesRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
})
export class TransacoesModule {}
