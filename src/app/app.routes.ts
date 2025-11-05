import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
// Admin Components
import { AdminLayoutComponent } from './components/admin-layout/admin-layout';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { CargarCandidatosComponent } from './components/cargar-candidatos/cargar-candidatos';
import { CargarVotantesComponent } from './components/cargar-votantes/cargar-votantes';
import { ConfigurarPeriodoComponent } from './components/configurar-periodo/configurar-periodo';
import { ConsultarResultadosComponent } from './components/consultar-resultados/consultar-resultados';
// Votante Components
import { VotanteLayoutComponent } from './components/votante-layout/votante-layout';
import { BienvenidaVotanteComponent } from './components/bienvenida-votante/bienvenida-votante';
import { EmitirVotoComponent } from './components/emitir-voto/emitir-voto';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminPanelComponent },
      { path: 'cargar-candidatos', component: CargarCandidatosComponent },
      { path: 'cargar-votantes', component: CargarVotantesComponent },
      { path: 'configurar-periodo', component: ConfigurarPeriodoComponent },
      { path: 'consultar-resultados', component: ConsultarResultadosComponent }
    ]
  },
  {
    path: 'votante',
    component: VotanteLayoutComponent,
    children: [
      { path: '', component: BienvenidaVotanteComponent },
      { path: 'emitir-voto', component: EmitirVotoComponent }

    ]
  },
  { path: '**', redirectTo: '' }
];
