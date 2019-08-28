import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../Common/confirmation-dialog/confirmation-dialog.component';
import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-uavconfig-edit',
  templateUrl: './uavconfig-edit.component.html',
  styleUrls: ['./uavconfig-edit.component.css']
})
export class UavconfigEditComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private flash: NgFlashMessageService,
    private title: Title,) { }

  ngOnInit() {
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Do you really want to delete this Aircraft?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.showMessage('Implement me');
      } else {
        this.showMessage('Cancelled Delete!');
      }
    });
  }
  private showMessage(message): void {
    this.flash.showFlashMessage({
        messages: [message],
        dismissible: true,
        timeout: 10000,
        type: 'info'
    });
  }
}
