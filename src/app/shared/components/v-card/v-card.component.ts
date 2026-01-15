import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-v-card',
  standalone: false,
  templateUrl: './v-card.component.html',
  styleUrl: './v-card.component.scss',
})
export class VCardComponent {
  @Input() titulo: string = '';
}
