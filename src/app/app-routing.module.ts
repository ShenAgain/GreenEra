import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulePickupComponent } from './schedule-pickup/schedule-pickup.component';
import { ViewPickupHistoryComponent } from './view-pickup-history/view-pickup-history.component';
import { AppComponent } from './app.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { LoginComponent } from './login/login.component';
import { RecyclingGuideComponent } from './recycling-guide/recycling-guide.component';


const routes: Routes = [
  { path: '', component: AppComponent }, // Default route (main page)
  { path: 'home', component: HomeComponent },
  { path: 'schedule-pickup', component: SchedulePickupComponent },
  { path: 'pickup-history', component: ViewPickupHistoryComponent },
  { path: 'report-issue', component: ReportIssueComponent },
  { path: 'notification', component: NotificationComponent }, 
  { path: 'generate-report', component: GenerateReportComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'recycling-guide', component: RecyclingGuideComponent },
  { path: '**', redirectTo: '/home' },  // Wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
