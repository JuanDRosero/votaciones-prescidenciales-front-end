import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanelComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
  }

  cargarCandidatos(): void {
    this.router.navigate(['/cargar-candidatos']);
  }

  cargarVotantes(): void {
    this.router.navigate(['/cargar-votantes']);
  }

  consultarResultados(): void {
    alert('Función en desarrollo');
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
