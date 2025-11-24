import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent } from '@angular/material/dialog'; //, MatDialogActions

@Component({
  selector: 'app-game-over-screen',
  standalone: true,
  imports: [MatDialogModule],  // , MatDialogContent, MatDialogActions
  templateUrl: './game-over-screen.html',
  styleUrl: './game-over-screen.scss',
})
export class GameOverScreen {
constructor(public dialogRef: MatDialogRef<GameOverScreen>)
{}


playAgain() {
  this.dialogRef.close('playAgain');
}


}
