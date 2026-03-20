import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentView: string = 'home'; // Default view is set to 'home'

  setView(view: string): void {
    this.currentView = view;
  }
  isSidebarOpen = false;

  

  constructor(private router: Router) {}
  navigateToPickup() {
    this.router.navigate(['schedule-pickup']);  // Navigate to the scheduling-pickup route
  }

  navigateHome() {
    this.router.navigate(['']);  // Navigate to the home route
  }

  navigateToIssue() {
    this.router.navigate(['report-issue'])
  }
  navigateToNotification() {
    this.router.navigate(['notification'])
  }

  navigateToGenerateR() {
    this.router.navigate(['generate-report'])
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // Method to navigate programmatically
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
