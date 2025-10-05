
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  gameData: GameData = new GameData();

  constructor() {
    this.newGame();
  }

  newGame() {
    this.gameData = new GameData();
    console.log(this.gameData);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.gameData.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

}
