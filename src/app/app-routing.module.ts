import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LogoutComponent } from './Components/Authentication/logout/logout.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { DashboardComponent } from './Components/Common/dashboard/dashboard.component';

import { AircraftListComponent } from './Components/Aircraft/aircraft-list/aircraft-list.component';
import { AircraftDetailsComponent } from './Components/Aircraft/aircraft-details/aircraft-details.component';
import { AircraftEditComponent } from './Components/Aircraft/aircraft-edit/aircraft-edit.component';
import { AircraftInactiveComponent } from './Components/Aircraft/aircraft-inactive/aircraft-inactive.component'

import { ShelterListComponent } from './Components/Shelter/shelter-list/shelter-list.component';
import { ShelterEditComponent } from './Components/Shelter/shelter-edit/shelter-edit.component';
import { ShelterDetailsComponent } from './Components/Shelter/shelter-details/shelter-details.component';
import { ShelterInactiveComponent } from './Components/Shelter/shelter-inactive/shelter-inactive.component';

import { IssueDetailsComponent } from './Components/Issue/issue-details/issue-details.component';
import { IssueEditComponent } from './Components/Issue/issue-edit/issue-edit.component';
import { IssueListComponent } from './Components/Issue/issue-list/issue-list.component';

import { CalibrationListComponent } from './Components/Calibration/calibration-list/calibration-list.component';
import { CalibrationDetailsComponent } from './Components/Calibration/calibration-details/calibration-details.component';
import { CalibrationEditComponent } from './Components/Calibration/calibration-edit/calibration-edit.component';
import { CalibrationInactiveComponent } from './Components/Calibration/calibration-inactive/calibration-inactive.component';

import { AuthGuard } from './Guards/auth.guard';



const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'logout', component: LogoutComponent, data: {title: 'Logout'}},
    {path: 'signup', component: SignupComponent, data: {title: 'Signup'}},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Welcome to White Board'}},

    {path: 'aircraft', component: AircraftListComponent, canActivate: [AuthGuard], data: {title: 'Aircraft List'}},
    {path: 'aircraft/new', component: AircraftEditComponent, canActivate: [AuthGuard], data: {title: 'New Aircraft'}},
    {path: 'aircraft/:id/details', component: AircraftDetailsComponent, canActivate: [AuthGuard], data: {title: 'Aircraft Details'}},
    {path: 'aircraft/:id/edit', component: AircraftEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Aircraft'}},
    {path: 'aircraft/inactive', component: AircraftInactiveComponent, canActivate: [AuthGuard], data: {title: 'Inactive Aircrafts'}},

    {path: 'shelters', component: ShelterListComponent, canActivate: [AuthGuard], data: {title: 'Shelter List'}},
    {path: 'shelters/new', component: ShelterEditComponent, canActivate: [AuthGuard], data: {title: 'New Shelter'}},
    {path: 'shelters/:id/details', component: ShelterDetailsComponent, canActivate: [AuthGuard], data: {title: 'New Shelter'}},
    {path: 'shelters/:id/edit', component: ShelterEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Shelter'}},
    {path: 'shelters/inactive', component: ShelterInactiveComponent, canActivate: [AuthGuard], data: {title: 'Inactive Shelters'}},

    {path: 'issues', component: IssueListComponent, canActivate: [AuthGuard], data: {title: 'Issues List'}},
    {path: 'issues/new', component: IssueEditComponent, canActivate: [AuthGuard], data: {title: 'New Issue'}},
    {path: 'issues/:id/details', component: IssueDetailsComponent, canActivate: [AuthGuard], data: {title: 'Details'}},
    {path: 'issues/:id/edit', component: IssueEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Issue'}},

    {path: 'calibration', component: CalibrationListComponent, canActivate: [AuthGuard], data: {title: 'Calibration List'}},
    {path: 'calibration/new', component: CalibrationEditComponent, canActivate: [AuthGuard], data: {title: 'New Calibration'}},
    {path: 'calibration/:id/details', component: CalibrationDetailsComponent, canActivate: [AuthGuard], data: {title: 'Calibration Details'}},
    {path: 'calibration/:id/edit', component: CalibrationEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Calibration'}},
    {path: 'calibration/inactive', component: CalibrationInactiveComponent, canActivate: [AuthGuard], data: {title: 'Inactive Calibration'}},


    // redirect bad and empty paths to dashboard component
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  ];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
