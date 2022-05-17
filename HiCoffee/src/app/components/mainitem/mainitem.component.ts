import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
