import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  rolSeleccionado: 'admin' | 'votante' = 'votante';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  iniciarSesion(): void {
    const role = this.authService.login(this.usuario, this.contrasena, this.rolSeleccionado);
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'votante') {
      this.router.navigate(['/votante']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos para el perfil seleccionado';
    }
  }
}
