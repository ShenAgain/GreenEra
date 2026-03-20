import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isDropdownOpen: boolean = false;
  isLoggedIn: boolean = false;
  fullName: string = '';

  currentView: string = 'home'; // Default view is set to 'home'

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}
    navigateToPickup() {
      this.router.navigate(['schedule-pickup']); // Navigate to the scheduling-pickup route
    }

    navigateToIssue() {
      this.router.navigate(['report-issue']);
    }

    navigateToView() {
      this.router.navigate(['view-pickup']);
    }

    navigateToNotification() {
      this.router.navigate(['notification'])
    }

    navigateToGenerateR() {
      this.router.navigate(['generate-report'])
    }
    navigateHome() {
      this.router.navigate(['']);  // Navigate to the home route
    }
    navigateToLogin() {
      this.router.navigate(['login']);
    }
   

  setView(view: string): void {
    this.currentView = view;
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.fullName = user.fullName;
    }

    this.setupSidebar(); 
    this.authService.isAuth().subscribe(
      isAuthenticated => {
        this.isLoggedIn = isAuthenticated;
      }
    );

    this.authService.getFullName().subscribe(name => { 
      this.fullName = name;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/login']);
  }

  // Add click outside handler
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
  
  // Sidebar functionality
  setupSidebar(): void {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('menuOverlay');

  // Open sidebar
  hamburger?.addEventListener('click', () => {
    this.openSidebar();
  });

  // Close sidebar when clicking the close button
  closeBtn?.addEventListener('click', () => {
    this.closeSidebar();
  });

  // Close sidebar when clicking outside (overlay)
  overlay?.addEventListener('click', () => {
    this.closeSidebar();
  });
}

openSidebar(): void {
  this.isSidebarOpen = true;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('menuOverlay');
  sidebar?.classList.add('open');
  overlay?.classList.add('active');
}

closeSidebar(): void {
  this.isSidebarOpen = false;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('menuOverlay');
  sidebar?.classList.remove('open');
  overlay?.classList.remove('active');
}

// Navigation Methods
navigateTo(route: string): void {
  this.router.navigate([route]);
}
}
