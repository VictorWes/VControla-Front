import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginData: LoginRequest = {
    email: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
}
