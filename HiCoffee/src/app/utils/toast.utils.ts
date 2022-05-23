/* eslint-disable object-shorthand */
import { ToastController } from '@ionic/angular';

export default class ToastUtils {

  constructor() {
  }

  async presentToast(message, position?, duration?) {
    const toastController = new ToastController();
    const toast = await toastController.create({
      position: position || 'bottom',
      message: message,
      duration: duration || 2000,
      cssClass: 'custome-toast'
    });
    toast.present();
  }

  async presentToastSuccess(message, position?, duration?) {
    const toastController = new ToastController();
    const toast = await toastController.create({
      position: position || 'bottom',
      header: 'Thành Công',
      message: message,
      duration: duration || 2000,
      cssClass: 'custome-toast-success'
    });
    toast.present();
  }

  async presentToastWarning(message, position?, duration?) {
    const toastController = new ToastController();
    const toast = await toastController.create({
      position: position || 'bottom',
      header: 'Cảnh Báo',
      message: message,
      duration: duration || 2000,
      cssClass: 'custome-toast-warning'
    });
    toast.present();
  }

  async presentToastError(message, position?, duration?) {
    const toastController = new ToastController();
    const toast = await toastController.create({
      position: position || 'bottom',
      header: 'Lỗi',
      message: message,
      duration: duration || 2000,
      cssClass: 'custome-toast-error'
    });
    toast.present();
  }
}
