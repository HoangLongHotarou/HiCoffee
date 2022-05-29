/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import AlertUtils from './alert.utils';
@Injectable({ providedIn: 'root' })
export default class InformErrorUtils {
    alert = new AlertUtils();
    constructor(private router: Router, private auth: AuthService) {
    }

    async unauthenticated() {
        await this.alert.presentAlert(
            'Phiên đăng nhập hết hạn',
            'Vui lòng đăng nhập lại'
        ).then(() => { this.auth.logout(); this.router.navigate(['login']); });
    }

    async networkError() {
        await this.alert.presentAlert(
            'Lỗi mạng',
            'Vui lòng kiểm tra kết nối mạng',
            [
                {
                    text: 'Reload',
                    handler: () => {
                        window.location.reload();
                    }
                }
            ]
        );
    }

    async catchError(error) {
        switch (error) {
            case 401:
                this.unauthenticated();
                break;
            default:
                this.networkError();
                break;
        }
    }
}
