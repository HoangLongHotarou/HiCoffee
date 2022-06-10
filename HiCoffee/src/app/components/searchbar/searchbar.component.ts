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

  ngOnInit() { }

  emit() {

  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  TextInput(event) {
    const textSearch = event.target.value;
    this.textChanged.emit(textSearch);
  }
}
