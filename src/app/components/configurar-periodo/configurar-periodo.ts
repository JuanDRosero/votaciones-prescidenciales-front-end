import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configurar-periodo',
  standalone: true,
  imports: [FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './configurar-periodo.html',
  styleUrl: './configurar-periodo.css'
})
export class ConfigurarPeriodoComponent {
  nombreUsuario: string = '';
  fecha: string = '';
  hora: string = '';
  vuelta: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
  }

  establecer(): void {
    if (!this.fecha || !this.hora || this.vuelta === null) {
      this.snackBar.open('Por favor complete todos los campos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Agregar la llamada a la API

    console.log('Configuración guardada:', {
      fecha: this.fecha,
      hora: this.hora,
      vuelta: this.vuelta
    });

    this.snackBar.open('✓ Periodo de votación configurado exitosamente', 'Cerrar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  cargarCandidatos(): void {
    this.router.navigate(['/cargar-candidatos']);
  }

  cargarVotantes(): void {
    this.router.navigate(['/cargar-votantes']);
  }

  consultarResultados(): void {
    this.router.navigate(['/consultar-resultados']);
  }

  configurarPeriodo(): void {
    this.router.navigate(['/configurar-periodo']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
