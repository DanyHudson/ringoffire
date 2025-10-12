import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  imports: [CommonModule, MatCardModule ],
  templateUrl: './game-info.html',
  styleUrl: './game-info.scss'
})
export class GameInfo {

}
