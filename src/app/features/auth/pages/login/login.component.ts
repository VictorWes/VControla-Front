import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData: LoginRequest = { email: '', senha: '' };
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService,
  ) {}

  async ngOnInit() {
   
    if (this.authService.isAuthenticated()) {

      this.router.navigate(['/sistema/dashboard']);
      return;
    }


    try {
      await this.socialAuthService.signOut();
    } catch (error) {

    }


    this.authSubscription = this.socialAuthService.authState.subscribe(
      (user: SocialUser) => {
        if (user && user.idToken) {
          console.log('Usuário clicou no botão Google.');

          if (!this.authService.isAuthenticated()) {
            this.fazerLoginGoogleNoBackend(user.idToken);
          }
        }
      },
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
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

        this.router.navigate(['/sistema/dashboard']);
      },
      error: (erro) => {
        console.error('Erro Google:', erro);
        this.snackBar.open('Falha ao autenticar com Google.', 'Fechar', {
          duration: 4000,
        });
        this.socialAuthService.signOut();
      },
    });
  }
}
