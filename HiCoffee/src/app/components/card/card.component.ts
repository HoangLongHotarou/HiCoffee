import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() image: string;
  @Input() coffeename: string;
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
