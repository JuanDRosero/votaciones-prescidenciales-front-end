import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from './result.model';

export interface VoterLoginDto {
  identificationNumber: number;
  password: string;
}

export interface TokenInfoDto {
  token: string;
  ttl: number;
}


export interface VoteInputDto {
  idVotingRound: number;
  idCandidate: number;
}

export interface CandidateInfoDto {
  id: number;
  number: number;
  name?: string;
  lastName?: string;
  politicalParty?: string;
}

export interface VotingRoundInfoDto {
  votingRoundId: number;
  votingRoundDate: string; // formato date (YYYY-MM-DD)
  beginningHour: number;
  endingHour: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //private baseUrl = 'voting-app-cganf3ahauewbzge.canadacentral-01.azurewebsites.net';
  private baseUrl = 'http://localhost:5212'; // <-- Cambia esto
  //private baseUrl = 'http://localhost:5087';

  constructor(private http: HttpClient) {}

  login(body: VoterLoginDto): Observable<Result<TokenInfoDto>> {
    return this.http.post<Result<TokenInfoDto>>(
      `${this.baseUrl}/api/Voter/login`,
      body
    );
  }

  vote(id: number, body: VoteInputDto): Observable<Result<boolean>> {
    return this.http.post<Result<boolean>>(
      `${this.baseUrl}/api/Voter/${id}/Vote`,
      body
    );
  }

  getLastVotingRound(): Observable<Result<VotingRoundInfoDto>> {
    return this.http.get<Result<VotingRoundInfoDto>>(
      `${this.baseUrl}/api/VotingRound/Last`
    );
  }

  getCandidatesByRound(id: number): Observable<Result<CandidateInfoDto[]>> {
    return this.http.get<Result<CandidateInfoDto[]>>(
      `${this.baseUrl}/api/VotingRound/${id}/Candidates`
    );
  }
    getCertificate(voterId: number, votingRoundID: number) {
      return this.http.get(
            `${this.baseUrl}/api/Voter/${voterId}/Certificate/${votingRoundID}`,
            { responseType: 'blob' }
          );
  }
}
