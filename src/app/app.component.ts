import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'vcontrola-frontend';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Se estiver na rota raiz, redireciona
    if (this.router.url === '/') {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/sistema/dashboard/home']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
