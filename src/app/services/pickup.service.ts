import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickupService {
  private apiUrl = 'http://localhost:8080/api/pickups';

  constructor(private http: HttpClient) {}

  getPickupHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pickup-history?userId=${userId}`);
  }

  schedulePickup(pickupData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/schedule`, pickupData);
  }
  
  updatePickupStatus(pickupId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-status/${pickupId}`, { status });
  }
  
}