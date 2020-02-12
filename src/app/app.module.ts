//#region Components
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
import { SpinnerComponent } from './Components/Common/spinner/spinner.component';
import { AccountEditComponent } from './Components/Account/account-edit/account-edit.component';
import { AccountDetailsComponent } from './Components/Account/account-details/account-details.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { PasswordChangeComponent } from './Components/Authentication/password-change/password-change.component';
import { AppComponent } from './app.component';
import { AircraftListComponent } from './Components/Aircraft/aircraft-list/aircraft-list.component';
import { AircraftEditComponent } from './Components/Aircraft/aircraft-edit/aircraft-edit.component';
import { AircraftDetailsComponent } from './Components/Aircraft/aircraft-details/aircraft-details.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LogoutComponent } from './Components/Authentication/logout/logout.component';
import { NavbarComponent } from './Components/Common/navbar/navbar.component';
import { ShelterEditComponent } from './Components/Shelter/shelter-edit/shelter-edit.component';
import { ShelterListComponent } from './Components/Shelter/shelter-list/shelter-list.component';
import { ShelterDetailsComponent } from './Components/Shelter/shelter-details/shelter-details.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
//#endregion

//#region Guards
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { IsSelfOrAdminGuard } from './Guards/is-self-or-admin.guard';
//#endregion

//#region Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//#endregion

//#region Pipes
import { MomentPipe } from './Pipes/moment.pipe';
//#endregion

//#region Resolvers
import { CalibrationResolver } from './Resolvers/calibration.resolver';
import { IssuesResolver } from './Resolvers/issues.resolver';
import { AircraftResolver} from './Resolvers/aircraft.resolver';
import { ShelterResolver } from './Resolvers/shelter.resolver';
import { BulletinResolver } from './Resolvers/bulletin.resolver';
//#endregion

//#region Services
import { LoginService } from './Services/login.service';
import { AdminAccountEditComponent } from './Components/Admin/admin-account-edit/admin-account-edit.component';
import { AdminPasswordChangeComponent } from './Components/Admin/admin-password-change/admin-password-change.component';

import { BulletinListComponent } from './Components/Bulletin/bulletin-list/bulletin-list.component';
import { BulletinEditComponent } from './Components/Bulletin/bulletin-edit/bulletin-edit.component';
import { BulletinDetailsComponent } from './Components/Bulletin/bulletin-details/bulletin-details.component';
import { BulletinInactiveComponent } from './Components/Bulletin/bulletin-inactive/bulletin-inactive.component';
//#endregion

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
    SpinnerComponent,
    AccountEditComponent,
    AccountDetailsComponent,
    AdminDashboardComponent,
    PasswordChangeComponent,
    AdminAccountEditComponent,
    AdminPasswordChangeComponent,
    BulletinListComponent,
    BulletinEditComponent,
    BulletinDetailsComponent,
    BulletinInactiveComponent,
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
    AdminGuard,
    IsSelfOrAdminGuard,
    LoginService,
    CalibrationResolver,
    IssuesResolver,
    AircraftResolver,
    ShelterResolver,
    BulletinResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
