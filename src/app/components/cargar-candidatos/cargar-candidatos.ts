import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { AdminApiService } from '../../services/admin-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cargar-candidatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cargar-candidatos.html',
  styleUrl: './cargar-candidatos.css'
})
export class CargarCandidatosComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminApiService
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

  async cargarArchivo() {
    if (this.selectedFile) {
      const response = await firstValueFrom(this.adminService.uploadCandidate(this.selectedFile));
      console.log("Se cargarón un total del %d registros",response.data);
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
