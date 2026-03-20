import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

// Components
import { SchedulePickupComponent } from './schedule-pickup/schedule-pickup.component';
import { ViewPickupHistoryComponent } from './view-pickup-history/view-pickup-history.component';
import { HomeComponent } from './home/home.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { NotificationComponent } from './notification/notification.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { LoginComponent } from './login/login.component';
import { RecyclingGuideComponent } from './recycling-guide/recycling-guide.component';


// Services
import { AuthService } from './services/auth.service';
import { WasteManagementService } from './services/waste-management.service';
import { NotificationService } from './services/notification.service';
import { AuthGuard } from './services/auth.guard';



// Define routes
const appRoutes: Routes = [
  { path: 'schedule-pickup', component: SchedulePickupComponent, canActivate: [AuthGuard] },
  { path: 'view-pickup-history', component: ViewPickupHistoryComponent, canActivate: [AuthGuard] },
  { path: 'report-issue', component: ReportIssueComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'generate-report', component: GenerateReportComponent, canActivate: [AuthGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'recycling-guide', component:RecyclingGuideComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },  // Default route to HomeComponent
];

@NgModule({
  declarations: [
    AppComponent,
    SchedulePickupComponent,
    ViewPickupHistoryComponent,
    HomeComponent,
    ReportIssueComponent,
    NotificationComponent,
    GenerateReportComponent,
    LoginComponent,
    RecyclingGuideComponent,    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes), 
    
    
  ],
  providers: [
    AuthService,
    WasteManagementService,
    NotificationService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
