import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent implements OnInit {
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
    this.router.navigate(['/admin/cargar-candidatos']);
  }

  cargarVotantes(): void {
    this.router.navigate(['/admin/cargar-votantes']);
  }

  configurarPeriodo(): void {
    this.router.navigate(['/admin/configurar-periodo']);
  }

  consultarResultados(): void {
    this.router.navigate(['/admin/consultar-resultados']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
