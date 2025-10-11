import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'add-player-dialog',
  standalone: true,
  imports: [
    MatDialogModule,      // <-- Add this for dialog directives like mat-dialog-content
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './add-player-dialog.html',
  styleUrl: './add-player-dialog.scss'
})
export class AddPlayerDialog {
  playerName: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(): void {
    this.dialogRef.close(this.playerName);
  }
}