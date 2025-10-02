
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from 'src/models/game-data';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  pickCardAnimation = false;
  gameData: GameData = new GameData();

  newGame() { }

  takeCard() {
    this.pickCardAnimation = true;

  }
}
