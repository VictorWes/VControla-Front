import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: false,
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.scss',
})
export class RecuperarSenhaComponent {
  form: FormGroup;
  loading = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    const email = this.form.value.email;

    this.authService.recuperarSenha(email).subscribe({
      next: () => {
        this.loading = false;
        this.emailSent = true; 
        this.snackBar.open(
          'E-mail enviado! Verifique sua caixa de entrada.',
          'OK',
          { duration: 5000 },
        );
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(
          'Erro ao solicitar. Verifique o e-mail informado.',
          'Fechar',
          { duration: 5000 },
        );
      },
    });
  }
}
