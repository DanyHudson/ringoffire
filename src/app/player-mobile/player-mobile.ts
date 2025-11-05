import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  imports: [],
  templateUrl: './player-mobile.html',
  styleUrl: './player-mobile.scss',
})
export class PlayerMobile {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Output() delete = new EventEmitter<void>();

  constructor() { }


  ngOnInit(): void { };

  onDeletePlayer() {
    this.delete.emit();
  }


}
