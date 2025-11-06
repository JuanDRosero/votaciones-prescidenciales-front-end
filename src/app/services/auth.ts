import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string | null = null;
  private currentRole: 'admin' | 'votante' | null = null;

  // Ahora acepta el rol seleccionado explícitamente
  login(username: string, password: string, rol: 'admin' | 'votante'): 'admin' | 'votante' | null {
    // Aquí podrías consultar la tabla correspondiente según el rol,
    // esta versión es solo de ejemplo simulado:
    if (rol === 'admin' && username === 'admin' && password === 'admin') {
      this.currentUser = username;
      this.currentRole = 'admin';
      return 'admin';
    }
    if (rol === 'votante' && username === 'usuario' && password === 'usuario') {
      this.currentUser = username;
      this.currentRole = 'votante';
      return 'votante';
    }
    return null;
  }

  setCurrentUser(nombre: string, rol: 'admin' | 'votante' | null = null) {
    this.currentUser = nombre;
    if (rol) this.currentRole = rol;
  }

  logout(): void {
    this.currentUser = null;
    this.currentRole = null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  getCurrentRole(): 'admin' | 'votante' | null {
    return this.currentRole;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
