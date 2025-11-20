import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';
import { Player } from '../player/player';
import { PlayerMobile } from '../player-mobile/player-mobile';
import { AddButton } from '../add-button/add-button';
import { GameInfo } from "../game-info/game-info";
import { Observable } from 'rxjs';
import { Injectable, inject, OnDestroy } from '@angular/core';
// import { FirestoreDataService } from "../firebase-services/firestore-data.service";
import { Firestore, collection, collectionData, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerDialog } from '../edit-player-dialog/edit-player-dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Player, PlayerMobile, AddButton, GameInfo],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})

@Injectable({
  providedIn: 'root'
})

export class Game implements OnDestroy {
  gameData: GameData = new GameData();
  addPlayerNote: string = '';
  gamesCollection: any;
  gameId: string = '';

  unsubscribeGames: () => void = () => { };

  firestore = inject(Firestore);
  items$: Observable<any[]> = new Observable<any[]>();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private dialog: MatDialog) {  // here 'cdr' needed to be added to be able to manually trigger the vanishing of the card
    this.newGame();
    this.gamesCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
      console.log(params);
      console.log(this.gameId);

      this.gamesCollection = collection(this.firestore, 'games');
      const docRef = doc(this.gamesCollection, this.gameId);
      onSnapshot(docRef, (snapshot: any) => {
        console.log('Document data:', snapshot.data());
        const data = snapshot.data();
        this.gameData.players = data.players;
        this.gameData.profilePics = data.profilePics;
        this.gameData.stack = data.stack;
        this.gameData.playedCards = data.playedCards;
        this.gameData.currentPlayer = data.currentPlayer;
        this.gameData.pickCardAnimation = data.pickCardAnimation;
        this.gameData.currentCard = data.currentCard;
        this.cdr.detectChanges();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribeGames) {
      this.unsubscribeGames();
    }
  }

  async newGame() {
    this.gameData;
  }

  takeCard() {
    if (this.gameData.players.length === 0) {
      this.addPlayerNote = 'Please add players';
      return;
    }
    if (!this.gameData.pickCardAnimation) {
      this.gameData.currentCard = this.gameData.stack.pop() || '';
      this.gameData.pickCardAnimation = true;
      this.gameData.currentPlayer++;
      this.gameData.currentPlayer = this.gameData.currentPlayer % this.gameData.players.length;
      this.saveGame();

      setTimeout(() => {
        this.gameData.playedCards.push(this.gameData.currentCard as string);
        this.gameData.pickCardAnimation = false;
        this.saveGame();
        this.cdr.detectChanges();
      }, 1000);
    }
    this.addPlayerNote = '';
  }

  addPlayer(name: string) {
    this.gameData.players.push(name);
    this.gameData.profilePics.push('1fe.png'); // default profile pic
    // this.saveGame();  // calling this here would also be fine
  }

  saveGame() {
    this.gamesCollection = collection(this.firestore, 'games');
    const docRef = doc(this.gamesCollection, this.gameId);
    console.log('save game data check', this.gameData.toJson())

    updateDoc(docRef, this.gameData.toJson());
  }

  onPlayerAdded(name: string) { // more elegant way to handle the event also more according to Angular naming conventions
    this.addPlayer(name);
    this.saveGame();
  }

  editPlayer(playerId: number) {
    console.log('editing player', playerId);
    const playerName = this.gameData.players[playerId];
    // const dialogRef = this.dialog.open(EditPlayerDialog);
    const dialogRef = this.dialog.open(EditPlayerDialog, {
      data: { name: playerName }
    });



    // this.openDialog(playerName);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        console.log('received changes', change);
        this.gameData.profilePics[playerId] = change;
        this.saveGame();
      }
    });

  }

  // openDialog(playerName: string): void {
  //   this.dialog.open(EditPlayerDialog, {
  //     data: { name: playerName }

  //   }).afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }


  deletePlayer(index: number) {
    this.gameData.players.splice(index, 1);
    this.saveGame();
  }

  startNewGame() {
    this.gameData = new GameData();
    this.saveGame();
  }


}
