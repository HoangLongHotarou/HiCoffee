import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-mainitem',
  templateUrl: './mainitem.component.html',
  styleUrls: ['./mainitem.component.scss'],
})
export class MainitemComponent implements OnInit, OnChanges {

  @Input() imgSrc: string;
  @Input() title: string;
  @Input() address: string;
  @Input() description: string;
  @Input() category$: any[];
  @Output() clicked = new EventEmitter();

  strCategory: string;

  constructor() { }

  ngOnInit() {}

  ngOnChanges() { 
    if (this.category$) {
      this.strCategory = this.convertCategoryArrToString(); 
    }   
  }

  convertCategoryArrToString(): string {
    let str = '';
    this.category$.forEach(cat => {
      str += `${cat.category.type}, `;
    })
    return str.substring(0, str.length-2);
  }
}
