import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

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

  ngOnInit(): void {
    const path = window.location.pathname;
    if (path === '' || path === '/') {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/sistema/dashboard']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
