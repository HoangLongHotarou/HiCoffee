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
            message: message,
            buttons: buttons || ['OK']        
        });
        await this.alert.present();
    }

    async presentAlertConfirm(header,message, handelrCallBack) {        
        const alert = await this.alertController.create({
          header: header,
          message: message,
          buttons: [
            {
                text: 'Xác nhận',
                handler: handelrCallBack['OK']
            },
            {
              text: 'Hủy',
              handler: handelrCallBack['Cancel']
            },            
          ]
        });
    
        await alert.present();
    }
}