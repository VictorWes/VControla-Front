import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransacoesRoutingModule } from './transacoes-routing.module';
import { TransacaoListaComponent } from './pages/transacao-lista/transacao-lista.component';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TransacaoListaComponent],
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
  ],
})
export class TransacoesModule {}
