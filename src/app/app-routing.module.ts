//#region Components
import { LoginComponent } from './Components/Authentication/login/login.component';
import { LogoutComponent } from './Components/Authentication/logout/logout.component';
import { SignupComponent } from './Components/Authentication/signup/signup.component';
import { PasswordChangeComponent } from './Components/Authentication/password-change/password-change.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { AccountDetailsComponent } from './Components/Account/account-details/account-details.component';
import { AccountEditComponent } from './Components/Account/account-edit/account-edit.component';

import { AircraftListComponent } from './Components/Aircraft/aircraft-list/aircraft-list.component';
import { AircraftDetailsComponent } from './Components/Aircraft/aircraft-details/aircraft-details.component';
import { AircraftEditComponent } from './Components/Aircraft/aircraft-edit/aircraft-edit.component';
import { AircraftInactiveComponent } from './Components/Aircraft/aircraft-inactive/aircraft-inactive.component';

import { BulletinListComponent } from './Components/Bulletin/bulletin-list/bulletin-list.component';
import { BulletinDetailsComponent } from './Components/Bulletin/bulletin-details/bulletin-details.component';
import { BulletinEditComponent } from './Components/Bulletin/bulletin-edit/bulletin-edit.component';
import { BulletinInactiveComponent } from './Components/Bulletin/bulletin-inactive/bulletin-inactive.component';

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


import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminAccountEditComponent} from './Components/Admin/admin-account-edit/admin-account-edit.component';
import { AdminPasswordChangeComponent } from './Components/Admin/admin-password-change/admin-password-change.component'

import { UavconfigDetailsComponent } from './Components/Aircraft/UAVConfiguration/uavconfig-details/uavconfig-details.component';
import { UavconfigEditComponent } from './Components/Aircraft/UAVConfiguration/uavconfig-edit/uavconfig-edit.component';
//#endregion

//#region Guards
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { IsSelfOrAdminGuard } from './Guards/is-self-or-admin.guard';
//#endregion

//#region Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//#endregion

//#region Resolvers
import { IssuesResolver } from './Resolvers/issues.resolver';
import { CalibrationResolver } from './Resolvers/calibration.resolver';
import { ShelterResolver } from './Resolvers/shelter.resolver';
import { AircraftResolver } from './Resolvers/aircraft.resolver';
import { BulletinResolver } from './Resolvers/bulletin.resolver';
//#endregion

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'logout', component: LogoutComponent, data: {title: 'Logout'}},
    {path: 'passwordchange', canActivate: [IsSelfOrAdminGuard], component: PasswordChangeComponent, data: {title: 'Change password'}},


    {path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      data: {title: 'Welcome to White Board'}
    },

    {path: 'admin',
      canActivate: [AuthGuard, AdminGuard],
      data: {title: 'Admin Dash'},
      children: [
        {path: '', component: AdminDashboardComponent, data: {title: 'Admin Dashboard'}},
        {path: 'account/new', component: SignupComponent },
        {path: 'account/:id', component: AdminAccountEditComponent, },
        {path: 'passwordChange', component: AdminPasswordChangeComponent, data: {title: 'AdminPasswordChange'}}
      ]
    },
    {path: 'account/:id', component: AccountDetailsComponent, canActivate: [AuthGuard], data: {title: 'Account Details'}},
    {path: 'account/:id/edit', component: AccountEditComponent, canActivate: [AuthGuard, IsSelfOrAdminGuard]},


    {path: 'bulletins',
      canActivate: [AuthGuard],
      children:
      [
        {path: '', pathMatch: 'full',
          component: BulletinListComponent,
          resolve: {bulletins: BulletinResolver},
          data: {title: 'Bulletin List'}},
        {path: 'inactive', component: BulletinInactiveComponent, data: {title: 'Inactive Bulletins'}},
        {path: 'new', component: BulletinEditComponent, data: {title: 'New Bulletin'}},
        {path: ':id/details', component: BulletinDetailsComponent, data: {title: 'Bulletin Details'}},
        {path: ':id/edit', component: BulletinEditComponent, data: {title: 'Edit Bulletin'}}
      ]
    },

    {path: 'aircrafts',
      canActivate: [AuthGuard],
      children:
      [
        {path: '',
          component: AircraftListComponent,
          canActivate: [AuthGuard],
          resolve: {aircrafts: AircraftResolver},
          data: {title: 'Aircraft List'},
          pathMatch: 'full'},
        {path: 'new', component: AircraftEditComponent, data: {title: 'New Aircraft'}},
        {path: 'inactive', component: AircraftInactiveComponent, data: {title: 'Inactive Aircrafts'}},
        {path: ':id', component: AircraftListComponent, data: {title: 'Aircraft List'}},
        {path: ':id/details', component: AircraftDetailsComponent, data: {title: 'Aircraft Details'}},
        {path: ':id/edit', component: AircraftEditComponent, data: {title: 'Edit Aircraft'}},
        {path: ':id/uavconfig', component: UavconfigDetailsComponent, data: {title: 'Uav Configuration'}},
        {path: ':id/uavconfig/edit', component: UavconfigEditComponent, data: {title: 'Edit Configuration'}}
      ]
    },

  {path: 'shelters',
    canActivate: [AuthGuard],
    children:
    [
      {path: '',
        pathMatch: 'full',
        component: ShelterListComponent,
        resolve: {shelters: ShelterResolver},
        data: {title: 'Shelter list'}
      },
      {path: 'new', component: ShelterEditComponent, canActivate: [AuthGuard], data: {title: 'New Shelter'}},
      {path: 'inactive', component: ShelterInactiveComponent, canActivate: [AuthGuard], data: {title: 'Inactive Shelters'}},
      {path: ':id/details', component: ShelterDetailsComponent, canActivate: [AuthGuard], data: {title: 'New Shelter'}},
      {path: ':id/edit', component: ShelterEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Shelter'}},
    ]

  },

    {path: 'issues',
      canActivate: [AuthGuard],
      children:
      [
        {path: '',
          pathMatch: 'full',
          component: IssueListComponent,
          resolve: {issues: IssuesResolver},
          data: {title: 'Issues List'}
        },
        {path: 'new', component: IssueEditComponent, canActivate: [AuthGuard], data: {title: 'New Issue'}},
        {path: ':id/details', component: IssueDetailsComponent, canActivate: [AuthGuard], data: {title: 'Details'}},
        {path: ':id/edit', component: IssueEditComponent, canActivate: [AuthGuard], data: {title: 'Edit Issue'}},
      ]
    },

    {path: 'calibrations',
      canActivate: [AuthGuard],
      children:
      [
        {path: '',
        component: CalibrationListComponent,
        resolve: {calList: CalibrationResolver},
        canActivate: [AuthGuard],
        data: {title: 'Calibrations List'}},
        {path: 'new', component: CalibrationEditComponent, data: {title: 'New Calibration'}},
        {path: 'inactive', component: CalibrationInactiveComponent, data: {title: 'Inactive Calibrations'}},
        {path: ':id/details', component: CalibrationDetailsComponent, data: {title: 'Calibrations Details'}},
        {path: ':id/edit', component: CalibrationEditComponent, data: {title: 'Edit Calibration'}},
      ]
    },
    // redirect bad and empty paths to dashboard component
    {path: '**', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})


export class AppRoutingModule {


 }
