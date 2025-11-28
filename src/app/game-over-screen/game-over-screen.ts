import { Component, inject } from '@angular/core';
import { GameData } from '../../../src/models/game-data';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-game-over-screen',
  standalone: true,
  imports: [MatDialogModule],  
  templateUrl: './game-over-screen.html',
  styleUrl: './game-over-screen.scss',
})

export class GameOverScreen {
  firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<GameOverScreen>, private router: Router) { }

  playAgain() {
    this.dialogRef.close('playAgain');
    this.newGame();
  }

  newGame() {
    let gameData = new GameData();
    const gamesCollection = collection(this.firestore, 'games');
    const newGameData = gameData.toJson();
    addDoc(gamesCollection, newGameData).then(() => {
      this.router.navigate(['/']);
    });
  }

 
}
