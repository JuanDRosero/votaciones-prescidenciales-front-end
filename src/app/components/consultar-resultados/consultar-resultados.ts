import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminApiService } from '../../services/admin-service';
import { AppService } from '../../services/app-service';
import { firstValueFrom, Observable } from 'rxjs';

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
  resultados: ResultadoCandidato[] = [];
  /**
   *
   */
  constructor(private adminService : AdminApiService,
    private appService: AppService
  ) {
    this.cargarResultado().then(res => {
      this.resultados = res;
    });
  }
  async cargarResultado() : Promise<ResultadoCandidato[]>{
    const dataVR = await firstValueFrom(this.appService.getLastVotingRound());
    const data = await firstValueFrom(this.adminService.getResult(dataVR.data!.votingRoundId));

    return data.data!.votesInformation.map(item => ({
      nombre: item.name,
      porcentaje: item.votes / data.data!.total *100,
      color: "#8e2323",
      foto: 'assets/candidato.png'
    }));
  }
}
