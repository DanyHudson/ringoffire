import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-player-mobile',
  imports: [SlicePipe],
  templateUrl: './player-mobile.html',
  styleUrl: './player-mobile.scss',
})
export class PlayerMobile {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Input() image: string = '1fe.png';
  @Output() delete = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { };

  onDeletePlayer() {
    this.delete.emit();
  }


}
