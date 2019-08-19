import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgFlashMessagesModule} from 'ng-flash-messages';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgFlashMessagesModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
