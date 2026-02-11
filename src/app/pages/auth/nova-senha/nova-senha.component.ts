import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nova-senha',
  standalone: false,
  templateUrl: './nova-senha.component.html',
  styleUrl: './nova-senha.component.scss',
})
export class NovaSenhaComponent implements OnInit {
  form: FormGroup;
  token: string = '';
  loading = false;
  tokenValido = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
    this.route.queryParams.subscribe((params) => {
      console.log('📦 Parâmetros da URL:', params);

      this.token = params['token'];

      if (this.token) {
        this.tokenValido = true;
        console.log('✅ Token válido recebido.');
      } else {
        console.error('❌ Nenhum token encontrado.');
        this.mostrarErro('Link inválido ou expirado. Solicite novamente.');
        setTimeout(() => this.router.navigate(['/auth/login']), 3000);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid || !this.token) return;

    const { senha, confirmarSenha } = this.form.value;

    if (senha !== confirmarSenha) {
      this.mostrarErro('As senhas não coincidem.');
      return;
    }

    this.loading = true;
    this.authService.redefinirSenha(this.token, senha).subscribe({
      next: () => {
        this.snackBar.open('Senha alterada com sucesso! Faça login.', 'OK', {
          duration: 5000,
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        this.mostrarErro('Erro ao alterar senha. O link pode ter expirado.');
      },
    });
  }

  mostrarErro(msg: string) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
