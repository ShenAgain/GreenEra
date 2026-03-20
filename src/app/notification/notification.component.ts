import { Component, OnInit } from '@angular/core';
import { Notification } from '../models/notification.model';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  isAdmin: boolean = false;
  newNotification: Notification = {
    message: '',
    eventType: 'Announcement',
    date: new Date()
  };

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.checkAdminStatus();
}

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  checkAdminStatus(): void {
    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = role ==='admin';
    });
  }

  broadcastAnnouncement(): void {
    if (this.isAdmin && this.newNotification.message.trim()) {
      this.notificationService.createNotification(this.newNotification).subscribe({
        next: (createdNotification) => {
          this.notifications.unshift(createdNotification);
          this.newNotification.message = '';
        },
        error: (error) => {
          console.error('Error creating notification:', error);
        }
      });
    }
  }

  viewNotificationDetails(notification: Notification): void {
    // Implement logic to view notification details
    console.log('Viewing notification:', notification);
  }
}