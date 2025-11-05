import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { AdminApiService } from '../../services/admin-service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cargar-candidatos',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
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
    private adminService: AdminApiService,
    private snackBar: MatSnackBar
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
      this.snackBar.open('Por favor seleccione un archivo CSV', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
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
        this.snackBar.open('Por favor seleccione un archivo CSV', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  async cargarArchivo() {
    if (this.selectedFile) {
      try {
        const response = await firstValueFrom(this.adminService.uploadCandidate(this.selectedFile));
        console.log("Se cargaron un total de %d registros", response.data);


        this.snackBar.open(`✓ Se cargaron exitosamente ${response.data} candidatos`, 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });


        this.selectedFile = null;
        this.fileName = '';

      } catch (error) {
        console.error('Error al cargar candidatos:', error);
        this.snackBar.open('✗ Error al cargar el archivo de candidatos', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    } else {
      this.snackBar.open('Por favor seleccione un archivo primero', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  cargarCandidatos(): void {
    this.router.navigate(['/cargar-candidatos']);
  }

  cargarVotantes(): void {
    this.router.navigate(['/cargar-votantes']);
  }

  consultarResultados(): void {
    this.router.navigate(['/consultar-resultados']);
  }

  volver(): void {
    this.router.navigate(['/admin']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
