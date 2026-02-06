import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  estaLogado: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.estaLogado = !!token;
  }
  editarPerfil() {
    this.router.navigate(['/sistema/perfil']);
  }

  sair() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_nome');

    this.router.navigate(['/auth/login']);
  }

  irParaLogin() {
    this.router.navigate(['/auth/login']);
  }
}
