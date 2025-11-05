import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string | null = null;
  private currentRole: 'admin' | 'votante' | null = null;

  login(username: string, password: string): 'admin' | 'votante' | null {
    if (username === 'admin' && password === 'admin') {
      this.currentUser = username;
      this.currentRole = 'admin';
      return 'admin';
    }
    if (username === 'usuario' && password === 'usuario') {
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
