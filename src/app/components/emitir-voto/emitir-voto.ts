import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, CandidateInfoDto, VoteInputDto, VotingRoundInfoDto } from '../../services/app-service';

@Component({
  selector: 'app-emitir-voto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emitir-voto.html',
  styleUrl: './emitir-voto.css'
})
export class EmitirVotoComponent {
  idVotingRound!: number;
  identificationVoter: number = 1100000001;
  candidatos: CandidateInfoDto[] = [];
  candidatoSeleccionado: CandidateInfoDto | null = null;
  mostrarConfirmacion: boolean = false;
  mostrarCertificado: boolean = false;

  constructor(private appService: AppService) {
    // Consulta el id de la ronda antes de obtener candidatos
    this.appService.getLastVotingRound().subscribe({
      next: res => {
        if (!res.hasError && res.data) {
          this.idVotingRound = res.data.votingRoundId;
          this.obtenerCandidatos(this.idVotingRound);
        } else {
          alert('No se pudo obtener la ronda de votación actual');
        }
      },
      error: err => {
        alert('Error consultando la ronda de votación actual');
        console.error(err);
      }
    });
  }

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
    if (this.candidatoSeleccionado && this.idVotingRound) {
      const body: VoteInputDto = {
        idVotingRound: this.idVotingRound,
        idCandidate: this.candidatoSeleccionado.id
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
    alert('Descargando certificado, funcionalidad pendiente.');
    this.mostrarCertificado = false;
    this.candidatoSeleccionado = null;
  }

  cerrarCertificado(): void {
    this.mostrarCertificado = false;
    this.candidatoSeleccionado = null;
  }
}
