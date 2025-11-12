import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Si no está logueado, redirige siempre a login
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    const role = this.authService.getCurrentRole();

    // Si navega a /admin... debe ser admin
    if (state.url.startsWith('/admin')) {
      if (role === 'admin') {
        return true;
      }
      // Si no, vete a login o podrías mandar a un "no autorizado"
      return this.router.createUrlTree(['/login']);
    }

    // Si navega a /votante... debe ser votante
    if (state.url.startsWith('/votante')) {
      if (role === 'votante') {
        return true;
      }
      return this.router.createUrlTree(['/login']);
    }

    // Por defecto, permite otras rutas (puedes ajustar esto)
    return true;
  }
}
