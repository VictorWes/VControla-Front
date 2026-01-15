import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioRequest } from '../../../../core/models/usuario-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  usuario: UsuarioRequest = {
    nome: '',
    email: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Ferramenta de aviso do Material
  ) {}

  onSubmit() {
    this.authService.cadastrar(this.usuario).subscribe({
      next: (response) => {
        this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/auth/login']);
      },
      error: (erro) => {
        this.snackBar.open('Erro ao cadastrar. Verifique os dados.', 'Fechar', { duration: 3000 });
        console.error(erro);
      }
    });
  }
}
