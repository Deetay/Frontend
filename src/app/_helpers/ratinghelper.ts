import { MatDialogRef, MatDialog } from "@angular/material";
import { RateComponent } from "../rate/rate.component";
import { Injectable } from "@angular/core";

@Injectable()
export class RatingHelper {
  private dialogRef: MatDialogRef<RateComponent>

  constructor(public dialog: MatDialog) {
  }

  open(photo: any, user: any) {
    this.dialogRef = this.dialog.open(RateComponent, {
      panelClass: 'rating',
      data: {
        userPhoto: photo,
        userData: user
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
