import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './dialog-animation-delete.html',
  styleUrls: ['./dialog-animation-delete.css'],
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  cancelar(): void {
    this.dialogRef.close();
  }
}
