import { ToastController } from "@ionic/angular";

export default class ToastUtils {
    constructor() {

    }

    async presentSucess(message) {
        var toastController = new ToastController();
        const toast = await toastController.create({
          message: message,
          duration: 2000
        });
        toast.present();
    }
}