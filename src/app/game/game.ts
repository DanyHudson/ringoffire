import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameData } from '../../../src/models/game-data';
import { Player } from '../player/player';
import { AddButton } from '../add-button/add-button';
import { GameInfo } from "../game-info/game-info";
import { Observable } from 'rxjs';
import { Injectable, inject, OnDestroy } from '@angular/core';
// import { FirestoreDataService } from "../firebase-services/firestore-data.service";
import { Firestore, collection, collectionData, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';


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

export class Game implements OnDestroy {
  pickCardAnimation = false;
  currentCard: string | undefined = undefined;
  gameData: GameData = new GameData();
  addPlayerNote: string = '';
  gamesCollection: any;

  // unsubscribeGames: () => void;
  unsubscribeGames: () => void = () => { };

  firestore = inject(Firestore);
  items$: Observable<any[]> = new Observable<any[]>();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {  // here 'cdr' needed to be added to be able to manually trigger the vanishing of the card
    // this.unsubscribeGames = () => {};
    this.newGame();
    this.gamesCollection = collection(this.firestore, 'games');
  }

  // version with onSnapshot
  ngOnInit(): void {
    
    // this.route.params.subscribe(params => {
    //   console.log(params);
    //   console.log(params['gameId']);
      
    //   this.gamesCollection = collection(this.firestore, 'games');
    //   const docRef = this.gamesCollection;
    //   onSnapshot(docRef, (snapshot: any) => {
    //     snapshot.forEach((doc: any) => {
    //       console.log('Document data:', doc.data());
    //     });
    //   });


    // });

   this.route.params.subscribe(params => {
      console.log(params);
      console.log(params['gameId']);
      
      this.gamesCollection = collection(this.firestore, 'games');
      const docRef = doc(this.gamesCollection, params['gameId']);
      onSnapshot(docRef, (snapshot: any) => {
        snapshot.forEach((doc: any) => {
          console.log('Document data:', doc.data());
        });
      });


    });

  }

  // getSingleDocRef(colId: string, docId: string) {
  //   return doc(collection(this.firestore, colId), docId);

  // }

  ngOnDestroy(): void {
    if (this.unsubscribeGames) {
      this.unsubscribeGames();
    }
  }

  async newGame() {
    this.gameData;
    // const gamesCollection = collection(this.firestore, 'games');
    // const newGameData = this.gameData.toJson();
    // await addDoc(gamesCollection, newGameData);
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
