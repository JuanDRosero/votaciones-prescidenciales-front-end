import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../../services/app-service';
import { AdminApiService } from '../../services/admin-service';
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

  /**
   *
   */
  constructor(private appService : AppService,
    private adminService : AdminApiService
  ) {}
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

  async simulacion() {
    const data = await firstValueFrom(this.appService.getLastVotingRound());
    const dataSimulado = await firstValueFrom(this.adminService.generateRandomVotes(data.data!.votingRoundId));
    console.log('Simulación ejecutada');
  }
}
