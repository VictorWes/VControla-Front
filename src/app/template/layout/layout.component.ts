import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private router: Router) {}
  editarPerfil() {
    this.router.navigate(['/sistema/perfil']);
  }

  sair() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_nome');

    this.router.navigate(['/auth/login']);
  }
}
