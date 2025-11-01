
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, collection, collectionData, query, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { GameData } from '../../models/game-data';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss'
})
export class StartScreen {
  constructor(private router: Router) { }

  ngOnInit(): void { };
  firestore = inject(Firestore);

  newGame() {
    // start game
    // console.log('New Game started');
    let gameData = new GameData();
    const gamesCollection = collection(this.firestore, 'games');
    const newGameData = gameData.toJson();
    addDoc(gamesCollection, newGameData).then((docRef) => {
      console.log('New game created with ID:', docRef.id);
      this.router.navigate(['/game', docRef.id]);
    });


    // this.router.navigate(['/game']);
  }

}
