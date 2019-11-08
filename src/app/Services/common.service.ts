import { Injectable } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../Components/Common/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private flash: NgFlashMessageService,
    private title: Title,
    private dialog: MatDialog,
  ) { }

  /**
   * Display message to user
   * @param message - string message to be displayed
   * @param level - string alert level sevarity ['info', 'success', 'warning', 'danger']
   */
  public showMessage(message: string, level: string): void {
    if (level === undefined) {
      level = 'info';
    }
    this.flash.showFlashMessage({
      messages: [message],
      dismissible: true,
      timeout: 10000,
      type: level
    });
  }

  /**
   * Sets the title of the current page
   * @param title -string of title to be displayed in browser tab
   */
  public setPageTitle(title: string): void {
    this.title.setTitle(title);
  }

  /**
   * reusable verification dialog
   * @param message - string of message to be displayed to user
   * @returns Observable of result
   */
  public verifyDialogResult(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message
    });

    return dialogRef.afterClosed();
  }
  public calculateDueDate(date, duration, period): string {
    return moment(date, 'YYYY-MM-DD').add(duration, period).format('YYYY-MM-DD');
  }

  public checkIsDueDays(date: string, duration: string): boolean {
    return moment(date, 'YYYY-MM-DD').add(duration, 'days').isSameOrBefore(moment.now());
  }

  public isDueThisMonth(date): boolean {
    return moment(date, 'YYYY-MM-DD').isSame(moment.now(), 'month');
  }
  public isDueThisWeek(date): boolean {
    return moment(date, 'YYYY-MM-DD').isSame(moment.now(), 'week');
  }

  public isDue3Months(dueDate): boolean {
    const threeMonthsFromNow = moment(moment.now()).add(3, 'months');
    return moment(dueDate).isSame(threeMonthsFromNow, 'month');
  }

  public isPastDue(date, duration, period): boolean {
    return moment(this.calculateDueDate(date, duration, period)).isSameOrBefore(moment.now());
  }
}
