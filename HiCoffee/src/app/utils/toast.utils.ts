/* eslint-disable object-shorthand */
import { ToastController } from '@ionic/angular';

export default class ToastUtils {
    constructor() {
    }

    async presentSuccess(message) {
        const toastController = new ToastController();
        const toast = await toastController.create({
          message: message,
          duration: 2000
        });
        toast.present();
    }
}
