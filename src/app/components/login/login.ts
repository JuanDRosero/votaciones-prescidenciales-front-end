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

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  iniciarSesion(): void {
    if (this.authService.login(this.usuario, this.contrasena)) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
