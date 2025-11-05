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
  horaInicio: number | null = null;
  horaFin: number | null = null;
  horas: number[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
    this.horas = Array.from({length: 24}, (_, i) => i); // [0,1,...,23]
  }

  establecer(): void {
    if (!this.fecha || this.horaInicio === null || this.horaFin === null) {
      this.snackBar.open('Por favor complete todos los campos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (this.horaInicio > this.horaFin) {
      this.snackBar.open('La hora de inicio no puede ser mayor a la hora de fin', 'Cerrar', {
        duration: 3200,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Enviar datos numéricos de hora al backend:
    console.log('Configuración guardada:', {
      fecha: this.fecha,
      horaInicio: this.horaInicio,
      horaFin: this.horaFin
    });

    this.snackBar.open('✓ Periodo de votación configurado exitosamente', 'Cerrar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  // (tus métodos de navegación igual)
}
