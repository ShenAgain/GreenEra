import { Component } from '@angular/core';
import { WasteManagementService } from '../services/waste-management.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent {
  issueTypes = ['Missed Pickup', 'Broken Bin', 'Delayed Pickup', 'Other'];
  selectedIssueType: string = '';
  issueDescription: string = '';
  issueLocation: string = '';
  issueAdditionalComments: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private wasteService: WasteManagementService) {}

  reportIssue(): void {
    // Create issue data from form fields
    const issueData = {
      issueType: this.selectedIssueType,
      description: this.issueDescription,
      location: this.issueLocation,
      additionalComments: this.issueAdditionalComments,
    };

    // Submit the issue using the service
    this.wasteService.reportIssue(issueData)
      .then(response => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.resetForm();
      })
      .catch(error => {
        this.errorMessage = 'An error occurred while reporting the issue. Please try again.';
        this.successMessage = '';
      });
  }

  // Reset the form fields
  resetForm(): void {
    this.selectedIssueType = '';
    this.issueDescription = '';
    this.issueLocation = '';
    this.issueAdditionalComments = '';
  }
}
