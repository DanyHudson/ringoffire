import { Component,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFabButton } from '@angular/material/button';
import { AddPlayerDialog } from '../add-player-dialog/add-player-dialog';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [MatFabButton, MatDialogModule],
  templateUrl: './add-button.html',
  styleUrls: ['./add-button.scss']
})
export class AddButton {
  @Output() playerAdded = new EventEmitter<string>();

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialog);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.playerAdded.emit(name);
        // Add the player name to your players array here
        console.log('Player added:', name);
      }
    });
  }
}