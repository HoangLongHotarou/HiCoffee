import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-mainitem',
  templateUrl: './mainitem.component.html',
  styleUrls: ['./mainitem.component.scss'],
})
export class MainitemComponent implements OnInit {

  @Input() imgSrc: string;
  @Input() title: string;
  @Input() address: string;
  @Input() description: string;
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}
}
