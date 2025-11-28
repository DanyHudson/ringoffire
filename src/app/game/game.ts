import { Component, ChangeDetectorRef, Injectable, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';
import { Player } from '../player/player';
import { PlayerMobile } from '../player-mobile/player-mobile';
import { AddButton } from '../add-button/add-button';
import { GameInfo } from "../game-info/game-info";
import { Observable } from 'rxjs';
import { Firestore, collection, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerDialog } from '../edit-player-dialog/edit-player-dialog';
import { GameOverScreen } from '../game-over-screen/game-over-screen';
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
  gameOver = false;

  unsubscribeGames: () => void = () => { };

  firestore = inject(Firestore);
  items$: Observable<any[]> = new Observable<any[]>();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.newGame();
    this.gamesCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
      this.gamesCollection = collection(this.firestore, 'games');
      const docRef = doc(this.gamesCollection, this.gameId);
      onSnapshot(docRef, (snapshot: any) => {
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
    if (this.gameData.stack.length === 0) {
      this.gameOver = true;
      this.openGameOverDialog();
      return;
    } else if (this.gameData.players.length === 0) {
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

  openGameOverDialog() {
    this.dialog.open(GameOverScreen, { disableClose: true }).afterClosed().subscribe(result => {
      if (result === 'playAgain') {
      }
    });
  }

  addPlayer(name: string) {
    name = name.trim().slice(0, 7);
    this.gameData.players.push(name);
    this.gameData.profilePics.push('1fe.png');
  }

  saveGame() {
    this.gamesCollection = collection(this.firestore, 'games');
    const docRef = doc(this.gamesCollection, this.gameId);
    updateDoc(docRef, this.gameData.toJson());
  }

  onPlayerAdded(name: string) {
    this.addPlayer(name);
    this.saveGame();
  }

  editPlayer(playerId: number) {
    const playerName = this.gameData.players[playerId];
    const dialogRef = this.dialog.open(EditPlayerDialog, {
      data: { name: playerName }
    });

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change === 'DELETE') {
          this.gameData.players.splice(playerId, 1);
          this.gameData.profilePics.splice(playerId, 1);
        } else {
          this.gameData.profilePics[playerId] = change;
        }
        this.saveGame();
        this.cdr.detectChanges();
      }
    });
  }

  deletePlayer(index: number) {
    this.gameData.players.splice(index, 1);
    this.saveGame();
  }

  startNewGame() {
    this.gameData = new GameData();
    this.saveGame();
  }


}
