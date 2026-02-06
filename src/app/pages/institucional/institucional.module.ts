import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InstitucionalRoutingModule } from './institucional-routing.module';
import { TermosComponent } from './termos/termos.component';
import { PrivacidadeComponent } from './privacidade/privacidade.component';
import { SuporteComponent } from './suporte/suporte.component';
import { TemplateModule } from '../../template/template.module';
import { InstitucionalLayoutComponent } from './institucional-layout/institucional-layout.component';

@NgModule({
  declarations: [
    TermosComponent,
    PrivacidadeComponent,
    SuporteComponent,
    InstitucionalLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TemplateModule,
    InstitucionalRoutingModule,
  ],
})
export class InstitucionalModule {}
