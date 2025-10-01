
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss'
})
export class StartScreen {
  constructor(private router: Router) {}

  ngOnInit(): void {};

  newGame() {
    // start game
    console.log('New Game started');
    this.router.navigate(['/game']);
  }

}
