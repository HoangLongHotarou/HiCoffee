import { Component } from '@angular/core';
import LoadingUtils from './utils/loading.utils';
import ToastUtils from './utils/toast.utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [LoadingUtils, ToastUtils],
})
export class AppComponent {
  constructor() {
  }
}
