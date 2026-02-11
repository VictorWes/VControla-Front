import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import {
  SocialAuthService,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginData: LoginRequest = {
    email: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/sistema/dashboard/home']);
      return;
    }

    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.fazerLoginGoogleNoBackend(user.idToken);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.token);

        if (response.nome) {
          localStorage.setItem('user_nome', response.nome);
        }

        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/sistema/dashboard']);
      },
      error: (erro) => {
        console.error(erro);
        this.snackBar.open('Email ou senha inválidos!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  fazerLoginGoogleNoBackend(googleToken: string) {
    this.authService.loginGoogle(googleToken).subscribe({
      next: (response) => {
        this.snackBar.open('Login com Google realizado!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/sistema/dashboard/home']);
      },
      error: (erro) => {
        console.error('Erro Google:', erro);
        this.snackBar.open('Falha ao autenticar com Google.', 'Fechar', {
          duration: 4000,
        });
      },
    });
  }
}
