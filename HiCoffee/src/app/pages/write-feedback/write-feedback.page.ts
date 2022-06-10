/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { CoffeeShopService } from 'src/app/services/coffee-shop/coffee-shop.service';
import LoadingUtils from 'src/app/utils/loading.utils';
import AlertUtils from 'src/app/utils/alert.utils';
import { FeedBack } from 'src/app/interfaces/feed-back';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.page.html',
  styleUrls: ['./write-feedback.page.scss'],
})
export class WriteFeedbackPage implements OnInit {

  coffeeShop: CoffeeShop;
  feedBack: FeedBack;
  currentRate: number;

  info: Information;
  user: any;
  userName: string;

  imgPhotos: any[] = [];
  rating = 1;
  desText: string;

  constructor(
    private route: ActivatedRoute,
    private localstore: LocalStoreService,
    private actionSheet: ActionSheetController,
    private coffeeShopService: CoffeeShopService,
    private loadingUtils: LoadingUtils,
    private alertUtils: AlertUtils,
  ) {
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('coffeeShop'));
    this.currentRate = 1;
    console.log(this.coffeeShop);
  }

  async ngOnInit() {
    this.info = await this.localstore.loadInfo('info');
    this.user = this.info.user;
    this.userName = this.user.username;
  }

  onRatingChange(rating: number) {
    this.rating = rating;
    // console.log('The evaluation was modified and now its value is: ',rating);
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
      const file = await this.getFileFromUrl(image.webPath);
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

  postFeedBack() {
    if (this.desText) {
      this.loadingUtils.presentLoading('Vui lòng chờ');
      const feedBackData = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        vote_rate: this.rating,
        feedback: this.desText
      };
      this.coffeeShopService.postFeedBackByIDCoffee(this.coffeeShop.id, feedBackData).then(res => {
        this.feedBack = res;
        if (this.imgPhotos.length > 0) {
          this.imgPhotos.forEach(async img => {
            const file = await this.getFileFromUrl(img.webPath);
            await this.postImageFeedBack(this.feedBack.id, file);
          });
        }
        this.loadingUtils.dismiss();
        this.alertUtils.presentAlert('Thông báo', 'Cảm ơn bạn đã gửi phản hồi!');
        this.resetAll();
      });
    }
    else {
      this.alertUtils.presentAlert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin!');
    }
  }

  async postImageFeedBack(idFeedBack: number, imgFile: File) {
    const imgFeedbackData = new FormData();
    imgFeedbackData.append('image', imgFile);
    await this.coffeeShopService.postImagesFeedBackByIDCoffee(this.coffeeShop.id, idFeedBack, imgFeedbackData).catch(err => {
      this.alertUtils.presentAlert('Lỗi', 'Không thể tải ảnh lên!');
      this.loadingUtils.dismiss();
    });
  }

  deleteImages() {
    this.imgPhotos = [];
  }

  checkValidPhotosCount(): boolean {
    let check = true;
    if (this.imgPhotos.length >= 3) {
      this.alertUtils.presentAlert('Cảnh báo', 'Số lượng ảnh không được vượt quá 3 ảnh');
      check = false;
    }
    return check;
  }

  resetAll() {
    this.desText = '';
    this.imgPhotos = [];
  }
}
