import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { Player } from '../player/player';


@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './edit-player-dialog.html',
  styleUrl: './edit-player-dialog.scss',
})


export class EditPlayerDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, public dialogRef: MatDialogRef<EditPlayerDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



}

