import { Component, OnInit } from '@angular/core';
// Pode remover os imports de AuthService e Router se não for usar mais nada aqui

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vcontrola-frontend';


  constructor() {}

  ngOnInit() {
  }
}
