import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VCardComponent } from './components/v-card/v-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [VCardComponent],
  imports: [CommonModule, MatCardModule],
  exports: [VCardComponent, MatCardModule],
})
export class SharedModule {}
