import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';
import { Player } from '../player/player';
import { AddButton } from '../add-button/add-button';
import { GameInfo } from "../game-info/game-info";
// import { Observable } from 'rxjs';
import { Injectable, inject, OnDestroy } from '@angular/core';
// import { FirestoreDataService } from "../firebase-services/firestore-data.service";
import { Firestore, collection, query, onSnapshot } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Player, AddButton, GameInfo],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})

@Injectable({
  providedIn: 'root'
})
export class Game implements OnDestroy{
  pickCardAnimation = false;
  currentCard: string | undefined = undefined;
  gameData: GameData = new GameData();
  addPlayerNote: string = '';

  // unsubscribeGames: () => void;
  unsubscribeGames: () => void = () => {};

  firestore = inject(Firestore);

  // constructor(private cdr: ChangeDetectorRef, private firestore: Firestore) {  // here 'cdr' needed to be added to be able to manually trigger the vanishing of the card
  //   this.newGame();
  // }

  constructor(private cdr: ChangeDetectorRef) {  // here 'cdr' needed to be added to be able to manually trigger the vanishing of the card
    // this.unsubscribeGames = () => {};
    this.newGame();
  }

  // first version
  // ngOnInit(): void {
  //   console.log('Game component initialized');
  //   const gamesCollection = collection(this.firestore, 'games');
  //   collectionData(gamesCollection).subscribe((gameData: any) => {
  //     console.log('Games from Firestore:', gameData);
  //   });
  // }

// versuion with query
  // ngOnInit(): void {
  //   const gamesCollection = collection(this.firestore, 'games');
  //   const gamesQuery = query(gamesCollection);
  //   collectionData(gamesQuery).subscribe((gameData: any) => {
  //     console.log('Games from Firestore:', gameData);
  //   });
  // }


  // version with onSnapshot
   ngOnInit(): void {
    const gamesCollection = collection(this.firestore, 'games');
    const q = query(gamesCollection);
    onSnapshot(q, (gameData: any) => {
      console.log('Games from Firestore:', gameData);
    });

  }

  ngOnDestroy(): void {
  if (this.unsubscribeGames) {
    this.unsubscribeGames();
  }
}


  newGame() {
    this.gameData;
    // console.log(this.gameData);
  }

  takeCard() {
    if (this.gameData.players.length === 0) {
      this.addPlayerNote = 'Please add players before starting the game!';
      return;
    }
    if (!this.pickCardAnimation) {
      this.currentCard = this.gameData.stack.pop() || '';
      this.pickCardAnimation = true;
      // console.log('new card: ' + this.currentCard);
      // console.log('game data is ', this.gameData);

      this.gameData.currentPlayer++;
      this.gameData.currentPlayer = this.gameData.currentPlayer % this.gameData.players.length;
      setTimeout(() => {
        this.gameData.playedCards.push(this.currentCard as string);
        this.pickCardAnimation = false;
        this.cdr.detectChanges();
      }, 1000);

    }
    this.addPlayerNote = '';
  }

  addPlayer(name: string) {
    this.gameData.players.push(name);
  }

}
