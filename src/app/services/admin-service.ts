import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Result } from './result.model';

export interface InputVotingRound{
  date: string,
  beggingHour: number,
  endingHour: number
}

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

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
}
