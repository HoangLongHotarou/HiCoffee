import { Component } from '@angular/core';
import AlertUtils from './utils/alert.utils';
import LoadingUtils from './utils/loading.utils';
import ToastUtils from './utils/toast.utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [LoadingUtils, ToastUtils, AlertUtils],
})
export class AppComponent {
  constructor() {
  }
}
