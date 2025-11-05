import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Candidato {
  id: string;
  nombre: string;
  numero: number;
  partido: string;
  imagen: string;
}

@Component({
  selector: 'app-emitir-voto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emitir-voto.html',
  styleUrl: './emitir-voto.css'
})
export class EmitirVotoComponent {
  candidatos: Candidato[] = [
    { id: '1', numero: 1, nombre: 'Candidato 1', partido: 'Partido 1', imagen: 'assets/candidato1.png' },
    { id: '2', numero: 2, nombre: 'Candidato 2', partido: 'Partido 2', imagen: 'assets/candidato2.png' },
    { id: '3', numero: 3, nombre: 'Candidato 3', partido: 'Partido 3', imagen: 'assets/candidato3.png' },
    { id: '4', numero: 4, nombre: 'Candidato 4', partido: 'Partido 4', imagen: 'assets/candidato4.png' },
    { id: '5', numero: 5, nombre: 'Candidato 5', partido: 'Partido 5', imagen: 'assets/candidato5.png' },
    { id: 'blanco', numero: 6, nombre: 'Voto en blanco', partido: 'Ninguno', imagen: 'assets/blanco.png' }
  ];

  candidatoSeleccionado: Candidato | null = null;
  mostrarConfirmacion: boolean = false;
  mostrarCertificado: boolean = false;

  seleccionarCandidato(candidato: Candidato): void {
    this.candidatoSeleccionado = candidato;
    this.mostrarConfirmacion = true;
  }

  confirmarVoto(): void {
    if (this.candidatoSeleccionado) {
      // Lógica para guardar voto, enviar correo, etc.
      // Aquí normalmente iría la llamada a la API
      this.mostrarCertificado = true;
    }
    this.mostrarConfirmacion = false;
  }

  cancelarVoto(): void {
    this.mostrarConfirmacion = false;
    this.candidatoSeleccionado = null;
  }

  descargarCertificado(): void {
    // Aquí pondrías la lógica para descargar el PDF, por ejemplo usando window.open con la ruta correspondiente
    // window.open('ruta/certificado.pdf');
    alert('Descargando certificado, funcionalidad pendiente.');
    this.mostrarCertificado = false;
    this.candidatoSeleccionado = null;
  }

  cerrarCertificado(): void {
    this.mostrarCertificado = false;
    this.candidatoSeleccionado = null;
  }
}
