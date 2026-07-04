import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReservationRequest {
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submit(data: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(`${this.apiUrl}/api/reservations`, data);
  }
}
