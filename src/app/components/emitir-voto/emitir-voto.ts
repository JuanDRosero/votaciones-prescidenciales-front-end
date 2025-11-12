import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService, CandidateInfoDto, VoteInputDto, VotingRoundInfoDto } from '../../services/app-service';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-emitir-voto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emitir-voto.html',
  styleUrl: './emitir-voto.css'
})
export class EmitirVotoComponent {
  idVotingRound!: number;
  candidatos: CandidateInfoDto[] = [];
  candidatoSeleccionado: CandidateInfoDto | null = null;
  mostrarConfirmacion: boolean = false;
  mostrarCertificado: boolean = false;
  mostrarErrorVoto: boolean = false;
  mensajeErrorVoto: string = '';

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {
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
    // Toma identificación DEL USUARIO ACTUAL
    const identificationVoter = this.authService.getCurrentVoterId();
    if (this.candidatoSeleccionado && this.idVotingRound && identificationVoter) {
      const body: VoteInputDto = {
        idVotingRound: this.idVotingRound,
        idCandidate: this.candidatoSeleccionado.id
      };
      this.appService.vote(identificationVoter, body).subscribe({
        next: (respuesta) => {
          if (!respuesta.hasError && respuesta.data === true) {
            this.mostrarCertificado = true;
          } else {
            alert(respuesta.message ?? 'No se pudo registrar el voto.');
          }
        },
        error: (error) => {
          let backendMsg = '';
          if (error.error && typeof error.error === 'object') {
            backendMsg = error.error.message || '';
          } else if (error.error && typeof error.error === 'string') {
            try {
              const errObj = JSON.parse(error.error);
              backendMsg = errObj.message || '';
            } catch(e) {}
          }
          if (backendMsg.toLowerCase().includes('alredy voted') || backendMsg.toLowerCase().includes('already voted')) {
            this.mensajeErrorVoto = 'No está habilitado para votar porque ya ejerció su derecho en esta vuelta de elecciones. Si requiere aclaración contacte a un funcionario.';
            this.mostrarErrorVoto = true;
          } else {
            alert(backendMsg || 'Error de conexión con el servidor');
          }
          console.error('❌ Error HTTP al votar:', error);
        }
      });
    } else {
      alert('No se pudo determinar el identificador del votante.');
    }
    this.mostrarConfirmacion = false;
  }

  cancelarVoto(): void {
    this.mostrarConfirmacion = false;
    this.candidatoSeleccionado = null;
  }

  cerrarErrorVoto(): void {
    this.mostrarErrorVoto = false;
    this.mensajeErrorVoto = '';
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
