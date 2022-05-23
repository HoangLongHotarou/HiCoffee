import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  @Input() placeholder: string;
  @Output() textChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  emit() {
    
  }

  TextInput(event) {
    let textSearch = event.target.value;
    this.textChanged.emit(textSearch);    
  }
}
