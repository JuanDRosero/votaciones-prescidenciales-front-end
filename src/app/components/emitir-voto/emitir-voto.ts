import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appService, CandidateInfoDto, VoteInputDto } from '../../services/app-service';

@Component({
  selector: 'app-emitir-voto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emitir-voto.html',
  styleUrl: './emitir-voto.css'
})
export class EmitirVotoComponent {
  idVotingRound : number = 6;
  identificationVoter: number=1100000001;
  candidatos: CandidateInfoDto[] = [];

  constructor (private appService : appService){
    this.obtenerCandidatos(this.idVotingRound);
  }

  candidatoSeleccionado: CandidateInfoDto | null = null;
  mostrarConfirmacion: boolean = false;
  mostrarCertificado: boolean = false;

  obtenerCandidatos(idRonda: number): void {

    this.appService.getCandidatesByRound(idRonda).subscribe({
      next: (respuesta) => {
        if (!respuesta.hasError && respuesta.data) {
          this.candidatos = respuesta.data;
        } else {
          console.log(respuesta.message ?? 'Error al obtener candidatos');
        }
      },
      error: (error) => {
        console.error('Error HTTP:', error);
      }
    });
  }

  seleccionarCandidato(candidato: CandidateInfoDto): void {
    this.candidatoSeleccionado = candidato;
    this.mostrarConfirmacion = true;
  }

  confirmarVoto(): void {
      if (this.candidatoSeleccionado) {
    const body: VoteInputDto = {
      idVotingRound: this.idVotingRound,          // 👈 Debes tenerlo en el componente
      idCandidate: this.candidatoSeleccionado.id  // 👈 Viene del candidato seleccionado
    };

    this.appService.vote(this.identificationVoter, body).subscribe({
      next: (respuesta) => {
        if (!respuesta.hasError && respuesta.data === true) {
          console.log('✅ Voto registrado correctamente');
          this.mostrarCertificado = true;
        } else {
          console.error('⚠️ Error al votar:', respuesta.message);
          alert(respuesta.message ?? 'No se pudo registrar el voto.');
        }
      },
      error: (error) => {
        console.error('❌ Error HTTP al votar:', error);
        alert('Error de conexión con el servidor');
      }
    });
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
