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
  saudacao: string = '';

  ngOnInit(): void {
    const nomeCompleto = localStorage.getItem('user_nome') || 'Usuário';
    this.nomeUsuario = nomeCompleto.split(' ')[0];
    this.definirSaudacao();
  }

  definirSaudacao() {
    const hora = new Date().getHours();

    if (hora >= 0 && hora < 12) {
      this.saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }
}
