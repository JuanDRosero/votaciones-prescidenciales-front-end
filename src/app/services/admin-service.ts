import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Result } from './result.model';

export interface InputVotingRound{
  date: string,
  beggingHour: number,
  endingHour: number
}
export interface CandidateResult {
  id: number;
  number: number;
  name: string;
  politicalParty: string;
  votes: number;
}
export interface VotingSummary {
  total: number;
  votesInformation: CandidateResult[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  //private baseUrl = 'voting-admin-app-czh3e2dgexayawb2.canadacentral-01.azurewebsites.net';
  private baseUrl = 'http://localhost:5087';

  constructor(private http: HttpClient) {}

  uploadCandidate(file: File): Observable<Result<number>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Result<number>>(
      `${this.baseUrl}/api/Candidate`,
      formData
    );
  }

  uploadPoliticalParty(file: File): Observable<Result<number>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Result<number>>(
      `${this.baseUrl}/api/PoliticalParty`,
      formData
    );
  }

  uploadVoter(file: File): Observable<Result<number>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Result<number>>(
      `${this.baseUrl}/api/Voter`,
      formData
    );
  }
  uploadVotingRound(dto : InputVotingRound): Observable<Result<number>>{

    return this.http.post<Result<number>>(
      `${this.baseUrl}/api/VotingRound`,
      dto
    );
  }
    generateRandomVotes(idVotingRound: number): Observable<Result<number>>{

    return this.http.post<Result<number>>(
      `${this.baseUrl}/api/VotingRound/${idVotingRound}/GenerateVotes`,{});
  }
    getResult(idVotingRound: number): Observable<Result<VotingSummary>> {
    return this.http.get<Result<VotingSummary>>(
      `${this.baseUrl}/api/VotingRound/${idVotingRound}`);
  }
}
