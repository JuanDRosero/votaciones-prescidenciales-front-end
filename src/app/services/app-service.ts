import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// =====================
// Interfaces (modelos)
// =====================

export interface VoterLoginDto {
  identificationNumber: number;
  password: string;
}

export interface TokenInfoDto {
  token: string;
  ttl: number;
}

export interface TokenInfoDtoResult {
  hasError: boolean;
  message?: string;
  data?: TokenInfoDto;
}

export interface VoteInputDto {
  idVotingRound: number;
  idCandidate: number;
}

export interface BooleanResult {
  hasError: boolean;
  message?: string;
  data: boolean;
}

export interface BooleanNullableResult {
  hasError: boolean;
  message?: string;
  data?: boolean | null;
}

export interface CandidateInfoDto {
  id: number;
  name?: string;
  lastName?: string;
  politicalParty?: string;
}

export interface CandidateInfoDtoIEnumerableResult {
  hasError: boolean;
  message?: string;
  data?: CandidateInfoDto[] | null;
}

export interface VotingRoundInfoDto {
  votingRoundId: number;
  votingRoundDate: string; // formato date (YYYY-MM-DD)
  beginningHour: number;
  endingHour: number;
}

export interface VotingRoundInfoDtoResult {
  hasError: boolean;
  message?: string;
  data?: VotingRoundInfoDto;
}

// =====================
// Servicio Angular
// =====================

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://localhost:5212'; // <-- Cambia esto

  constructor(private http: HttpClient) {}

  login(body: VoterLoginDto): Observable<TokenInfoDtoResult> {
    return this.http.post<TokenInfoDtoResult>(
      `${this.baseUrl}/api/Voter/login`,
      body
    );
  }

  vote(id: number, body: VoteInputDto): Observable<BooleanNullableResult> {
    return this.http.post<BooleanNullableResult>(
      `${this.baseUrl}/api/Voter/${id}/Vote`,
      body
    );
  }

  getLastVotingRound(): Observable<VotingRoundInfoDtoResult> {
    return this.http.get<VotingRoundInfoDtoResult>(
      `${this.baseUrl}/api/VotingRound/Last`
    );
  }

  getCandidatesByRound(id: number): Observable<CandidateInfoDtoIEnumerableResult> {
    return this.http.get<CandidateInfoDtoIEnumerableResult>(
      `${this.baseUrl}/api/VotingRound/${id}/Candidates`
    );
  }
}
