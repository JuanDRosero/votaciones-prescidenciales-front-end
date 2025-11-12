import { Injectable } from '@angular/core';
import { AppService, VoterLoginDto, TokenInfoDto} from './app-service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Result } from './result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: string | null = null;
  private currentRole: 'admin' | 'votante' | null = null;
  private voterToken: string | null = null;
  private voterTokenTtl: number | null = null;
  private nombreVotante: string | null = null;

  constructor(private appService: AppService) {}

  private decodeJwtName(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      const claimName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
      return decoded[claimName] ?? null;
    } catch {
      return null;
    }
  }

  login(username: string, password: string, rol: 'admin' | 'votante'): Observable<'admin' | 'votante' | null> {
    if (rol === 'admin') {
      if (username === 'admin' && password === 'admin') {
        this.currentUser = username;
        this.currentRole = 'admin';
        this.nombreVotante = null;
        return of('admin');
      }
      return of(null);
    }

    if (rol === 'votante') {
      const body: VoterLoginDto = {
        identificationNumber: Number(username),
        password: password
      };
      return this.appService.login(body).pipe(
        map((res: Result<TokenInfoDto>) => {
          if (!res.hasError && res.data?.token) {
            this.currentUser = username;
            this.currentRole = 'votante';
            this.voterToken = res.data.token;
            this.voterTokenTtl = res.data.ttl;
            this.nombreVotante = this.decodeJwtName(res.data.token);
            return 'votante';
          }
          return null;
        }),
        catchError(() => of(null))
      );
    }

    return of(null);
  }

  setCurrentUser(nombre: string, rol: 'admin' | 'votante' | null = null) {
    this.currentUser = nombre;
    if (rol) this.currentRole = rol;
  }

  logout(): void {
    this.currentUser = null;
    this.currentRole = null;
    this.voterToken = null;
    this.voterTokenTtl = null;
    this.nombreVotante = null;
  }

  getCurrentUser(): string | null {
    if (this.currentRole === 'votante' && this.nombreVotante) {
      return this.nombreVotante;
    }
    return this.currentUser;
  }

  getCurrentRole(): 'admin' | 'votante' | null {
    return this.currentRole;
  }

  getVoterToken(): string | null {
    return this.voterToken;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
