import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
    let gameData = new GameData();
    const gamesCollection = collection(this.firestore, 'games');
    const newGameData = gameData.toJson();
    addDoc(gamesCollection, newGameData).then((docRef) => {
      this.router.navigate(['/game', docRef.id]);
    });
  }

}
