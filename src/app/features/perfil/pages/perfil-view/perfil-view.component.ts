import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil-view',
  standalone: false,
  templateUrl: './perfil-view.component.html',
  styleUrl: './perfil-view.component.scss',
})
export class PerfilViewComponent implements OnInit {
  formPerfil: FormGroup;
  formSenha: FormGroup;

  isLoading = false;
  isGoogleAccount = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.formPerfil = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.formSenha = this.fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    this.isLoading = true;
    this.authService.buscarPerfil().subscribe({
      next: (usuario) => {
        this.isLoading = false;

        this.formPerfil.patchValue({
          nome: usuario.nome,
          email: usuario.email,
        });
        this.isGoogleAccount = usuario.isGoogleAccount;
        if (this.isGoogleAccount) {
          this.formPerfil.get('email')?.disable();
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }
  salvarPerfil() {
    if (this.formPerfil.invalid) return;

    const dados = { nome: this.formPerfil.get('nome')?.value };

    this.authService.atualizarPerfil(dados).subscribe({
      next: () => this.mostrarMsg('Perfil atualizado com sucesso!'),
      error: () => this.mostrarMsg('Erro ao atualizar perfil.', true),
    });
  }

  alterarSenha() {
    if (this.formSenha.invalid) return;

    const { senhaAtual, novaSenha, confirmarSenha } = this.formSenha.value;

    if (novaSenha !== confirmarSenha) {
      this.mostrarMsg('As senhas não coincidem.', true);
      return;
    }

    const dadosParaEnvio = {
      senhaAtual: senhaAtual,
      novaSenha: novaSenha,
    };

    this.authService.alterarSenha(dadosParaEnvio).subscribe({
      next: () => {
        this.mostrarMsg('Senha alterada com sucesso!');
        this.formSenha.reset();

        Object.keys(this.formSenha.controls).forEach((key) => {
          this.formSenha.get(key)?.setErrors(null);
        });
      },
      error: (err) => {
        console.error(err);
        const msg = err.error || err.error?.message || 'Erro ao alterar senha.';
        this.mostrarMsg(msg, true);
      },
    });
  }
  mostrarMsg(msg: string, erro = false) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      panelClass: erro ? ['warning-snackbar'] : ['success-snackbar'],
      verticalPosition: 'top',
    });
  }
}
