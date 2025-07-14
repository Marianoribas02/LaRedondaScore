import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './Home-Page/pagina-principal/pagina-principal.component';
import { LoginPageComponent } from './Login/login-page/login-page.component';
import { FichaPartidoComponent } from './Home-Page/partidos/ficha-partido/ficha-partido.component';
import { FichaEquipoComponent } from './search/ficha-equipo/ficha-equipo.component';
import { RegisterPageComponent } from './Login/register-page/register-page.component';
import { DetallesLeagueComponent } from './Home-Page/barra-lateral/detalle-league/detalle-league.component';
import { FichaPlayerComponent } from './search/ficha-player/ficha-player.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { FichaDtComponent } from './search/ficha-dt/ficha-dt.component';
import { PerfilComponent } from './Perfil/perfil/perfil.component';

export const routes: Routes = [
    { path: 'login-page', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    {
      path: 'PaginaPrincipal',
      component: PaginaPrincipalComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ficha-partido/:id',
      component: FichaPartidoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ficha-equipo/:id',
      component: FichaEquipoComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'detalle-league/:id',
      component: DetallesLeagueComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ficha-dt/:id',
      component: FichaDtComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ficha-player/:id',
      component: FichaPlayerComponent,
      canActivate: [AuthGuard]
    },
    { path: 'perfil', component: PerfilComponent,  canActivate: [AuthGuard]
 },
    
    { path: '**', redirectTo: 'login-page' } 

  ];
