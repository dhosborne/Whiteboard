import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgFlashMessagesModule} from 'ng-flash-messages';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftListComponent } from './Components/Aircraft/aircraft-list/aircraft-list.component';
import { AircraftEditComponent } from './Components/Aircraft/aircraft-edit/aircraft-edit.component';
import { AircraftDetailsComponent } from './Components/Aircraft/aircraft-details/aircraft-details.component';
import { DashboardComponent } from './Components/Common/dashboard/dashboard.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LogoutComponent } from './Components/Authentication/logout/logout.component';
import { NavbarComponent } from './Components/Common/navbar/navbar.component';
import { ShelterEditComponent } from './Components/Shelter/shelter-edit/shelter-edit.component';
import { ShelterListComponent } from './Components/Shelter/shelter-list/shelter-list.component';
import { ShelterDetailsComponent } from './Components/Shelter/shelter-details/shelter-details.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { MomentPipe } from './Pipes/moment.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './Guards/auth.guard';
import { LoginService } from './Services/login.service';
import { IssueEditComponent } from './Components/Issue/issue-edit/issue-edit.component';
import { IssueDetailsComponent } from './Components/Issue/issue-details/issue-details.component';
import { IssueListComponent } from './Components/Issue/issue-list/issue-list.component';
import { ShelterInactiveComponent } from './Components/Shelter/shelter-inactive/shelter-inactive.component';
import { AircraftInactiveComponent } from './Components/Aircraft/aircraft-inactive/aircraft-inactive.component';
import { CalibrationDetailsComponent } from './Components/Calibration/calibration-details/calibration-details.component';
import { CalibrationEditComponent } from './Components/Calibration/calibration-edit/calibration-edit.component';
import { CalibrationInactiveComponent } from './Components/Calibration/calibration-inactive/calibration-inactive.component';
import { CalibrationListComponent } from './Components/Calibration/calibration-list/calibration-list.component';
import { UavconfigEditComponent } from './Components/Aircraft/UAVConfiguration/uavconfig-edit/uavconfig-edit.component';
import { UavconfigDetailsComponent } from './Components/Aircraft/UAVConfiguration/uavconfig-details/uavconfig-details.component';
import { ConfirmationDialogComponent } from './Components/Common/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AircraftListComponent,
    AircraftEditComponent,
    AircraftDetailsComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
    ShelterEditComponent,
    ShelterDetailsComponent,
    ShelterListComponent,
    SignupComponent,
    MomentPipe,
    ShelterDetailsComponent,
    IssueEditComponent,
    IssueDetailsComponent,
    IssueListComponent,
    ShelterInactiveComponent,
    AircraftInactiveComponent,
    CalibrationDetailsComponent,
    CalibrationEditComponent,
    CalibrationInactiveComponent,
    CalibrationListComponent,
    UavconfigEditComponent,
    UavconfigDetailsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    AuthGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
