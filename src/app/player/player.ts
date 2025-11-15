import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
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
  @Output() delete = new EventEmitter<void>();
  @Input() currentProfilePic: string = '';

  onDeletePlayer() {
    this.delete.emit();
  }
  
}
