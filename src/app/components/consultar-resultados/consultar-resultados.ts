import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface ResultadoCandidato {
  nombre: string;
  porcentaje: number; // usar un valor entre 0 y 100
  color: string;
  foto: string;
}

@Component({
  selector: 'app-consultar-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-resultados.html',
  styleUrl: './consultar-resultados.css'
})
export class ConsultarResultadosComponent {
  anio: number = 2025;
  mensajePendiente: string = 'Votación pendiente de realizar, la siguiente gráfica es una demostración de los resultados';
  resultados: ResultadoCandidato[] = [
    { nombre: 'Candidato 1', porcentaje: 70, color: '#65b100', foto: 'assets/candidato.png' },
    { nombre: 'Candidato 2', porcentaje: 25, color: '#ffa726', foto: 'assets/candidato.png' },
    { nombre: 'Candidato 3', porcentaje: 5, color: '#ffe14b', foto: 'assets/candidato.png' },
    { nombre: 'Candidato 4', porcentaje: 0, color: '#a7bed4', foto: 'assets/candidato.png' },
    { nombre: 'Candidato 5', porcentaje: 0, color: '#8e2323', foto: 'assets/candidato.png' }
  ];
}
