import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienvenida-votante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bienvenida-votante.html',
  styleUrl: './bienvenida-votante.css'
})
export class BienvenidaVotanteComponent {
  constructor(private router: Router) {}

  iniciarVotacion(): void {
    this.router.navigate(['/votante/emitir-voto']);
  }
}
