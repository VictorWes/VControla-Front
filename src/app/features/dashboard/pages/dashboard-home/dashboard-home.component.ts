import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  nomeUsuario: string = '';

  ngOnInit(): void {
    const nomeCompleto = localStorage.getItem('user_nome') || 'Usuário';
    this.nomeUsuario = nomeCompleto.split(' ')[0];
  }
}
