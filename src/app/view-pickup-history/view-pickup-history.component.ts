import { Component, OnInit } from '@angular/core';
import { WasteManagementService } from '../services/waste-management.service';
import { PickupHistory } from '../models/pickup-history.model';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-view-pickup-history',
  templateUrl: './view-pickup-history.component.html',
  styleUrls: ['./view-pickup-history.component.css']
})
export class ViewPickupHistoryComponent implements OnInit {
  history: PickupHistory[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private wasteService: WasteManagementService, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.getUserId().subscribe({
      next: (userId) => {
        if (userId) {
          this.loadPickupHistory(userId);
        } else {
          this.errorMessage = 'Please login to view pickup history';
          this.loading = false;
        }
      },
      error: (error) => {
        this.errorMessage = 'Authentication error';
        this.loading = false;
        console.error('Auth error:', error);
      }
    });
  }

  loadPickupHistory(userId: string): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.wasteService.getPickupHistory(userId).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (history) => {
        this.history = history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        if (history.length === 0) {
          this.errorMessage = 'No pickup history found';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error loading pickup history';
        console.error('Pickup history error:', error);
      }
    });
  }
}