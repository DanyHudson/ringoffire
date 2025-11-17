import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
// import { ALL_PROFILE_PICS } from '../../../src/models/profile-pics';

@Component({
  selector: 'add-player-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './add-player-dialog.html',
  styleUrl: './add-player-dialog.scss'
})
export class AddPlayerDialog {
  name: string = '';
  // allProfilePics = ALL_PROFILE_PICS;
  // currentProfilePic: string = this.allProfilePics[0];
  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // selectProfilePic(pic: string): void {
  //   this.currentProfilePic = pic;
  // }

  // addPlayer(): void {
  //   this.dialogRef.close(this.name);
  // }
  addPlayer(): void {
    this.dialogRef.close({ name: this.name });
  }


}