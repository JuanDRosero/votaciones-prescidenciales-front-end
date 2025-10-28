import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { CargarCandidatosComponent } from './components/cargar-candidatos/cargar-candidatos';
import { CargarVotantesComponent } from './components/cargar-votantes/cargar-votantes';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'cargar-candidatos', component: CargarCandidatosComponent },
  { path: 'cargar-votantes', component: CargarVotantesComponent },
  { path: '**', redirectTo: '' }
];
