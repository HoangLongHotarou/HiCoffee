import { Router } from '@angular/router';
import AlertUtils from './alert.utils';

export default class InformErrorUtils {
    alert = new AlertUtils();

    constructor(private router: Router) {
    }

    unauthenticated() {
        return this.alert.presentAlert(
            'Phiên đăng nhập hết hạn',
            'Vui lòng đăng nhập lại'
        ).then(() => {
            this.router.navigateByUrl('login');
        });
    }
}
