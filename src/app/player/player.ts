import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.scss'
})
export class Player {

  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Input() image: string = '1fe.png';
  @Output() delete = new EventEmitter<void>();

  onDeletePlayer() {
    this.delete.emit();
  }
  
}
