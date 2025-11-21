import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { ALL_PROFILE_PICS } from '../../../src/models/profile-pics';
// import { Player } from '../player/player';


@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './edit-player-dialog.html',
  styleUrl: './edit-player-dialog.scss',
})

export class EditPlayerDialog {
  @Output() delete = new EventEmitter<void>();


  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, public dialogRef: MatDialogRef<EditPlayerDialog>) { }

  allProfilePics = ['1fe.png', '2ma.png', '3rac.png', '4dive.png', '6slo.png', '7zeb.png'];
  // allProfilePics = ALL_PROFILE_PICS;

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeletePlayer() {
    this.delete.emit();
    this.dialogRef.close();
    console.log('player deleted'); 
  }
  

  // deletePlayer(index: number) {
  //   this.gameData.players.splice(index, 1);
  //   this.saveGame();
  // }

}

