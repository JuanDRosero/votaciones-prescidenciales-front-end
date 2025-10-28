import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cargar-votantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargar-votantes.html',
  styleUrl: './cargar-votantes.css'
})
export class CargarVotantesComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    const user = this.authService.getCurrentUser();
    this.nombreUsuario = user || 'Usuario';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.selectedFile = file;
      this.fileName = file.name;
    } else {
      alert('Por favor seleccione un archivo CSV');
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.csv')) {
        this.selectedFile = file;
        this.fileName = file.name;
      } else {
        alert('Por favor seleccione un archivo CSV');
      }
    }
  }

  cargarArchivo(): void {
    if (this.selectedFile) {
      console.log('Archivo a cargar:', this.selectedFile);
      alert(`Archivo ${this.fileName} listo para enviar al backend`);
    }
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

  volver(): void {
    this.router.navigate(['/admin']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
