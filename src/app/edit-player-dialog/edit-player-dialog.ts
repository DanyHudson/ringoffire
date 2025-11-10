import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './edit-player-dialog.html',
  styleUrl: './edit-player-dialog.scss',
})
export class EditPlayerDialog {

}
