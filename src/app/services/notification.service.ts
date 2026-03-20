import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Get all notifications
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  // Create new notification (admin broadcast)
  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/notifications`, notification);
  }

  // Get notifications by community
  getCommunityNotifications(communityName: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications/community/${communityName}`);
  }
}