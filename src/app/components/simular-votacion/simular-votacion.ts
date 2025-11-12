import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-simular-votacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simular-votacion.html',
  styleUrl: './simular-votacion.css'
})
export class SimularVotacionComponent {
  mostrarConfirmacion = false;
  mostrarResultado = false;

  abrirPopup() {
    this.mostrarConfirmacion = true;
  }

  confirmarSimulacion() {
    this.simulacion();
    this.mostrarConfirmacion = false;
    this.mostrarResultado = true;
  }

  cancelarSimulacion() {
    this.mostrarConfirmacion = false;
  }

  cerrarResultado() {
    this.mostrarResultado = false;
  }

  simulacion() {
    // Aquí llamas tu API de simulación o lógica
    // Ejemplo: this.appService.simularVotacion()...
    console.log('Simulación ejecutada');
  }
}
