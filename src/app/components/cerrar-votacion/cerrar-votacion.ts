import { Component } from '@angular/core';
import { AppService } from '../../services/app-service';
import { AdminApiService } from '../../services/admin-service';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cerrar-votacion',
  imports: [NgIf],
  templateUrl: './cerrar-votacion.html',
  styleUrl: './cerrar-votacion.css',
})
export class CerrarVotacion {
  mostrarConfirmacion = false;
  mostrarResultado = false;

  constructor(private appService : AppService,
      private adminService : AdminApiService
    ) {}
    abrirPopup() {
      this.mostrarConfirmacion = true;
    }

    confirmarCerrarVotacion() {
        this.cerrarVotacion();
        this.mostrarConfirmacion = false;
        this.mostrarResultado = true;
      }
    
      cancelarCerrarVoto() {
        this.mostrarConfirmacion = false;
      }
    
      cerrarResultado() {
        this.mostrarResultado = false;
      }
    
      async cerrarVotacion() {
        const data = await firstValueFrom(this.appService.getLastVotingRound());
        const dataSimulado = await firstValueFrom(this.adminService.closeRoundingVote(data.data!.votingRoundId));
        console.log('Votación Cerrada');
      }
}
