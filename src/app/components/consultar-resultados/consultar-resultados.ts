import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApiService, CandidateResult } from '../../services/admin-service';
import { AppService } from '../../services/app-service';
import { firstValueFrom } from 'rxjs';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  grid: ApexGrid;
};

export interface candidateInfoFull {
  name: string;
  votes: number;
  image: string;
}

@Component({
  selector: 'app-consultar-resultados',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './consultar-resultados.html',
  styleUrls: ['./consultar-resultados.css'] // 👈 corregido: era "styleUrl" (debe ser plural)
})
export class ConsultarResultadosComponent {
  anio: number = 2025;
 isPending:boolean = true;
  resultados: candidateInfoFull[] = [];
  chartOptions: Partial<ChartOptions> ={}; 

  constructor(
    private adminService: AdminApiService,
    private appService: AppService
  ) {
    this.cargarResultado();
  }

  async cargarResultado(): Promise<void> {
    try{
      const dataVR = await firstValueFrom(this.appService.getLastVotingRound());
      const data = await firstValueFrom(this.adminService.getResult(dataVR.data!.votingRoundId));
          this.resultados = data.data!.votesInformation.map((item) => ({
      name: item.name,
      votes: item.votes,
      image: 'assets/candidato.png'
    }));

    this.chartOptions = {
      series: [
        {
          name: 'Votos',
          data: this.resultados.map((r) => r.votes)
        }
      ],
      chart: {
        type: 'bar',
        height: 400,
        foreColor: "#cac6c6ff"
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 8,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val} votos`,
        offsetY: -20,
        style: {
          fontSize: '12px'
        }
      },
      xaxis: {
        categories: this.resultados.map((r) => r.name),
        position: 'bottom',
      },
      yaxis: {
        title: {
          text: 'Número de votos',
        }
      },
      fill: {
        type: 'gradient'
      },
      grid: {
        show: false
      },
      title: {
        text: 'Resultados de votación',
        align: "center"
      }
      };
      this.isPending = false;
    } catch{
      this.isPending=true;
    }
  }
}
