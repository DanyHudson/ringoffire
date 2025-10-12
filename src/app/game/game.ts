
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';
import { Player } from '../player/player';
import { AddButton } from '../add-button/add-button';
import { GameInfo } from "../game-info/game-info";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Player, AddButton, GameInfo],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  pickCardAnimation = false;
  currentCard: string | undefined = undefined;
  // currentCard: string | undefined = '';
  gameData: GameData = new GameData();

  constructor(private cdr: ChangeDetectorRef) {  // here 'cdr' needed to be added to be able to manually trigger the vanishing of the card
    this.newGame();
  }

  newGame() {
    this.gameData = new GameData();
    console.log(this.gameData);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      // this.currentCard = this.gameData.stack.pop();
      this.currentCard = this.gameData.stack.pop() || '';
      this.pickCardAnimation = true;
      console.log('new card: ' + this.currentCard);
      console.log('game data is ', this.gameData);

      setTimeout(() => {
        this.gameData.playedCards.push(this.currentCard as string);
        this.pickCardAnimation = false;
        // this.currentCard = undefined;
        this.cdr.detectChanges();
      }, 1000);

    }
  }

  addPlayer(name: string) {
  this.gameData.players.push(name);
}

}
