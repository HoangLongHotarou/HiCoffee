import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import AlertUtils from 'src/app/utils/alert.utils';
import { CoffeeShopService } from 'src/app/services/coffee-shop/coffee-shop.service';
import LoadingUtils from 'src/app/utils/loading.utils';
import ToastUtils from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-coffeeimageadd',
  templateUrl: './coffeeimageadd.page.html',
  styleUrls: ['./coffeeimageadd.page.scss'],
})
export class CoffeeimageaddPage implements OnInit {

  idCoffee: number;

  imgPhotos: any[] = [];


  constructor(private route: ActivatedRoute,
    private actionSheet: ActionSheetController,
    private alertUtils: AlertUtils,
    private toastUtils: ToastUtils,
    private router: Router,
    private loadingUtils: LoadingUtils,
    private coffeeShopService: CoffeeShopService,) {
    this.idCoffee = JSON.parse(this.route.snapshot.paramMap.get('idCoffee'));
  }

  ngOnInit() {
  }

  async showOptionChoose() {
    const asheet = await this.actionSheet.create({
      header: 'Tùy chọn ảnh',
      cssClass: 'actionSheetStyle',
      buttons: [
        {
          text: 'Chọn ảnh từ thư viện',
          handler: () => {
            this.chooseFromGallery();
            console.log('Image Selected from Gallery');
          }
        },
        {
          text: 'Chọn ảnh từ máy ảnh',
          handler: () => {
            this.chooseFromCamera();
            console.log('Camera selected');
          }
        },
        {
          text: 'Hủy',
          role: 'cancel'
        },
      ]
    });
    await asheet.present();
  }

  async chooseFromCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if (this.checkValidPhotosCount()) {
      this.imgPhotos.push(image);
    }
  }

  async chooseFromGallery() {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    if (this.checkValidPhotosCount()) {
      this.imgPhotos.push(image);
      let file = await this.getFileFromUrl(image.webPath);
      console.log(file);
    }
  }

  async getFileFromUrl(url: string, defaultType = 'image/jpeg') {
    const fileName = new Date().getTime() + '.jpeg';
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, {
      type: data.type || defaultType,
    });
  }

  deleteImages() {
    this.imgPhotos = [];
  }

  checkValidPhotosCount(): boolean {
    let check = true;
    if (this.imgPhotos.length >= 3) {
      this.alertUtils.presentAlert("Cảnh báo", "Số lượng ảnh không được vượt quá 3 ảnh");
      check = false;
    }
    return check;
  }


  async postCoffeeImage(imgFile: File) {
    let imgData = new FormData();
    imgData.append('image', imgFile);
    await this.coffeeShopService.postImagesByIDCoffee(this.idCoffee, imgData).catch(err => {
      this.alertUtils.presentAlert('Lỗi', 'Không thể tải ảnh lên!');
      this.loadingUtils.dismiss();
    });
  }

  async AddCoffeeImage() {
    if (this.imgPhotos.length > 0) {
      this.loadingUtils.presentLoading("Vui lòng chờ");
      this.imgPhotos.forEach(async img => {
        let file = await this.getFileFromUrl(img.webPath);
        await this.postCoffeeImage(file);
      });
      await this.loadingUtils.dismiss();
      this.toastUtils.presentToastSuccess("Thêm ảnh quán coffee thành công");
      //this.router.navigateByUrl('/tabs/user');
      this.router.navigateByUrl('/tabs/user').then(() => {
        window.location.reload();
      });
    } else {
      this.toastUtils.presentToastError("Vui lòng thêm ảnh quán coffee");
    }
  }
}
