import { Component, OnInit } from '@angular/core';
import { WastePickup } from '../models/waste-pickup.model';
import { WasteManagementService } from '../services/waste-management.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-schedule-pickup',
  templateUrl: './schedule-pickup.component.html',
  styleUrls: ['./schedule-pickup.component.css']
})
export class SchedulePickupComponent implements OnInit {
  pickup: WastePickup = {
    date: '',
    time: '',
    wasteType: 'Household',
    address: '',
    userId: '',
  };

  history: WastePickup[] = [];
  message: string = '';

  constructor(private wasteService: WasteManagementService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.loadPickupHistory(userId);
      }
    });
  }

  loadPickupHistory(userId: string): void {
    this.wasteService.getPickupHistory(userId).subscribe({
      next: (history) => {
        this.history = history;
      },
      error: (error) => {
        this.message = 'Error loading pickup history';
        console.error(error);
      }
    });
  }

  scheduleWastePickup(): void {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        const pickupRequest = {
          ...this.pickup,
          userId: userId
        };
        this.wasteService.schedulePickup(pickupRequest).subscribe({
          next: (response) => {
            this.message = 'Pickup successfully scheduled!';
            this.loadPickupHistory(userId);
            this.resetForm();
          },
          error: (error) => {
            this.message = 'Error scheduling pickup';
            console.error(error);
          }
        });
      } else {
        this.message = 'Please login to schedule a pickup';
      }
    });
  }
  
  resetForm(): void {
    this.pickup = {
      date: '',
      time: '',
      wasteType: 'Household',
      address: '',
      userId: ''
    };
  }
}
