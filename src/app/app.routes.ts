import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard'; // <-- AGREGA ESTA LÍNEA
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
// Admin Components
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { CargarCandidatosComponent } from './components/cargar-candidatos/cargar-candidatos';
import { CargarVotantesComponent } from './components/cargar-votantes/cargar-votantes';
import { ConfigurarPeriodoComponent } from './components/configurar-periodo/configurar-periodo';
import { ConsultarResultadosComponent } from './components/consultar-resultados/consultar-resultados';
import { SimularVotacionComponent } from './components/simular-votacion/simular-votacion';
// Votante Components
import { VotanteLayoutComponent } from './components/votante-layout/votante-layout';
import { BienvenidaVotanteComponent } from './components/bienvenida-votante/bienvenida-votante';
import { EmitirVotoComponent } from './components/emitir-voto/emitir-voto';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // Admin: solo accesible si el rol es admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard], // <--- PROTEGE TODO EL PANEL
    children: [
      { path: '', component: AdminPanelComponent, canActivate: [AuthGuard] },
      { path: 'cargar-candidatos', component: CargarCandidatosComponent, canActivate: [AuthGuard] },
      { path: 'cargar-votantes', component: CargarVotantesComponent, canActivate: [AuthGuard] },
      { path: 'configurar-periodo', component: ConfigurarPeriodoComponent, canActivate: [AuthGuard] },
      { path: 'consultar-resultados', component: ConsultarResultadosComponent, canActivate: [AuthGuard] },
      { path: 'simular-votacion', component: SimularVotacionComponent, canActivate: [AuthGuard] }

    ]
  },

  // Votante: solo accesible si el rol es votante
  {
    path: 'votante',
    component: VotanteLayoutComponent,
    canActivate: [AuthGuard], // <--- PROTEGE TODO EL PANEL
    children: [
      { path: '', component: BienvenidaVotanteComponent, canActivate: [AuthGuard] },
      { path: 'emitir-voto', component: EmitirVotoComponent, canActivate: [AuthGuard] }
    ]
  },

  { path: '**', redirectTo: '' }
];
