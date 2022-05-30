import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss'],
})
export class ItemFilterComponent implements OnInit {

  @Input() itemName: string;
  @Input() itemID: number;

  @Output() clickEvent = new EventEmitter();

  isClicked: boolean;

  constructor() { }

  ngOnInit() {}
  
  itemClicked(itemID: number) {    
    this.isClicked = this.isClicked ? false : true;   
    this.clickEvent.emit(itemID);
  }
}
