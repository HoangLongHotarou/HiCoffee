/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { AlertController, ModalController } from '@ionic/angular';

export default class AlertUtils {

    private alert: any;
    result: any;
    alertController = new AlertController();
    constructor() {
    }

    async presentAlert(title, message, buttons?) {
        this.alert = await this.alertController.create({
            header: title,
            animated: true,
            // eslint-disable-next-line object-shorthand
            message: message,
            buttons: buttons || ['OK']
        });
        await this.alert.present();
    }

    async presentAlertConfirm(header,message, handleCallBack) {
        const alert = await this.alertController.create({
          // eslint-disable-next-line object-shorthand
          header: header,
          // eslint-disable-next-line object-shorthand
          message: message,
          buttons: [
            {
                text: 'Xác nhận',
                handler: handleCallBack['OK']
            },
            {
              text: 'Hủy',
              handler: handleCallBack['Cancel']
            }
          ]
        });
        await alert.present();
    }
}
