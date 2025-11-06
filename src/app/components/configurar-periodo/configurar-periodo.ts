import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminApiService, InputVotingRound } from '../../services/admin-service';
import { firstValueFrom } from 'rxjs';

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
    private snackBar: MatSnackBar,
    private adminService: AdminApiService
  ) {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
    this.horas = Array.from({length: 24}, (_, i) => i); // [0,1,...,23]
  }

 async establecer() {
    if (!this.fecha || this.horaInicio === null || this.horaFin === null) {
      this.snackBar.open('Por favor complete todos los campos', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    const periodo : InputVotingRound = {
        date: this.fecha,
        beggingHour: Number(this.horaInicio),
        endingHour: Number(this.horaFin)
    };

    try {
            const response = await firstValueFrom(this.adminService.uploadVotingRound(periodo));
    
            this.snackBar.open('✓ Se creó la vuelta de votación', 'Cerrar', {
              duration: 3500,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          } catch (error) {
            console.error('Error al cargar votantes:', error);
            this.snackBar.open('✗ Error al crear la vuelta de votación', 'Cerrar', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
  }
}
