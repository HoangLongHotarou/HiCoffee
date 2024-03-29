/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-inputpassword',
  templateUrl: './inputpassword.component.html',
  styleUrls: ['./inputpassword.component.scss'],
})
export class InputpasswordComponent {
  showPassword = false;

  @Input() type: string;
  @Input() placeholder: string;

  @ContentChild(IonInput) input: IonInput;

  constructor() { }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
}
