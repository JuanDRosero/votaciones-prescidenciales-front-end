import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-votante-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './votante-layout.html',
  styleUrl: './votante-layout.css'
})
export class VotanteLayoutComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Igual al admin, toma el nombre del votante
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
  }

  iniciarVoto(): void {
    this.router.navigate(['/votante/emitir-voto']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
