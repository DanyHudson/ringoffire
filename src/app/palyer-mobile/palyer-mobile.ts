import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-palyer-mobile',
  imports: [],
  templateUrl: './palyer-mobile.html',
  styleUrl: './palyer-mobile.scss',
})
export class PalyerMobile {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Output() delete = new EventEmitter<void>();

  constructor() { }


  ngOnInit(): void { };

  onDeletePlayer() {
    this.delete.emit();
  }


}
