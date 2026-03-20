// services/waste-management.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WastePickup } from '../models/waste-pickup.model';
import { PickupHistory } from '../models/pickup-history.model';

@Injectable({
  providedIn: 'root'
})
export class WasteManagementService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Report an issue
  reportIssue(issueData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/issues/report`, {
      ...issueData,
      status: 'NEW'
    }).toPromise();
  }

  // Get all reported issues
  getIssues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/issues`);
  }

  // Get issue by ID
  getIssueById(issueId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/issues/${issueId}`);
  }

  // Schedule a waste pickup
  schedulePickup(pickup: WastePickup): Observable<any> {
    return this.http.post(`${this.apiUrl}/pickups/schedule`, pickup);
  }

  // Get pickup history
  getPickupHistory(userId: string): Observable<PickupHistory[]> {
    return this.http.get<PickupHistory[]>(`${this.apiUrl}/pickups/pickup-history?userId=${userId}`);
  }

  // Update issue status
  updateIssueStatus(issueId: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/issues/${issueId}`, { status });
  }

  generateReport(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reports/generate`, params);
  }
  
  getReportMetadata(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/metadata`);
  }
  
  exportReport(params: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/reports/export`, params, {
      responseType: 'blob'
    });
  }
}
