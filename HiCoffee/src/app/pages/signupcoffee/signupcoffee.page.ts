import { InformationService } from './../../services/information/information.service';
/* eslint-disable guard-for-in */
import LoadingUtils from 'src/app/utils/loading.utils';
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signupcoffee',
  templateUrl: './signupcoffee.page.html',
  styleUrls: ['./signupcoffee.page.scss'],
})
export class SignupcoffeePage implements OnInit {
  loading: any;

  coffeename: string;

  image_represent: any;
  image_file: File = null;

  description: string;
  min_price: number;
  max_price: number;

  listHour: string[] = [];
  value: string;
  listMinute: string[] = [];
  hourOpen: string;
  minuteOpen: string;
  hourClose: string;
  minuteClose: string;

  phonenumber: string;
  location: string;
  latitude: string;
  longitude: string;

  showImage: boolean = false;


  constructor(public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router,
    private loadingUtils: LoadingUtils,
    private route: ActivatedRoute,
    private infoService: InformationService
    // private axios: AxiosInstance
  ) { }

  async presentSpace() {
    const toast = await this.toastController.create({
      message: 'Các ô không được để trống !!!!!!!!',
      duration: 2000
    });
    toast.present();
  }

  async presentSucess() {
    const toast = await this.toastController.create({
      message: 'Đăng kí quán cà phê thành công rồi nè!',
      duration: 2000
    });
    toast.present();
  }

  async presentErrorTime() {
    const toast = await this.toastController.create({
      message: 'Thời gian sai !!!',
      duration: 2000
    });
    toast.present();
  }

  async test(str) {
    const toast = await this.toastController.create({
      message: str,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit(): void {
    for (let i = 0; i <= 24; i++) {
      this.value = i.toString();
      if (i < 10) {
        this.value = '0' + i.toString();
      }
      this.listHour.push(this.value);
    }
    for (let i = 0; i <= 60; i++) {
      this.value = i.toString();
      if (i < 10) {
        this.value = '0' + i.toString();
      }
      this.listMinute.push(this.value);
    }

  }

  // this.image_represent === undefined||

  async clickSignupCoffee() {
    if (this.coffeename === undefined || this.description === undefined || this.image_represent === undefined ||
      this.min_price === undefined || this.max_price === undefined || this.phonenumber === undefined || this.location === undefined
      || this.latitude === undefined || this.longitude === undefined || this.hourOpen === undefined || this.hourClose === undefined
      || this.minuteOpen === undefined || this.minuteClose === undefined) {
      this.presentSpace();
    } else {
      this.loadingUtils.presentLoading('Đang tạo mục quán coffee cho bạn');
      const coffee = new FormData();
      coffee.append('name', this.coffeename);
      coffee.append('description', this.description);
      coffee.append('image_represent', this.image_file);
      coffee.append('minimum_price', `${this.min_price}`);
      coffee.append('max_price', `${this.max_price}`);
      coffee.append('open_time', this.hourOpen + ':' + this.minuteOpen + ':00');
      coffee.append('closed_time', this.hourClose + ':' + this.minuteClose + ':00');
      coffee.append('phone_number', this.phonenumber);
      coffee.append('location', this.location);
      coffee.append('latitude', this.latitude);
      coffee.append('longitude', this.longitude);
      const check = await this.infoService.signUpCoffee(coffee);
      if (check > 0) {
        this.presentSucess();
        const checkstring = JSON.stringify(check);
        this.router.navigate(['addcoffeecategory', checkstring]);
      }
      this.loadingUtils.dismiss();
    }
  }

  async chooseFromGallery() {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    this.image_file = await this.getFileFromUrl(image.webPath);
    this.image_represent = image.webPath;
    console.log(this.image_file);
    this.showImage = true;
  }

  async getFileFromUrl(url: string, defaultType = 'image/jpeg') {
    const fileName = new Date().getTime() + '.jpeg';
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, {
      type: data.type || defaultType,
    });
  }
}

