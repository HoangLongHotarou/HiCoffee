import { LoadingController } from '@ionic/angular';

export default class LoadingUtils {

    private loading: any;

    constructor() {

    }

    async presentLoading(message, duration?) {
        var loadingController = new LoadingController();
        this.loading = await loadingController.create({
          cssClass: 'loading-style',
          message: message,
          duration: duration,
        });
        return this.loading.present();
    }

    dismiss() {
        this.loading.dismiss();
    }
}