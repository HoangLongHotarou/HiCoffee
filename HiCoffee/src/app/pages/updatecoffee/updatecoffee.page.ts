import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';
import ToastUtils from 'src/app/utils/toast.utils';
import LoadingUtils from 'src/app/utils/loading.utils';
import { InformationService } from 'src/app/services/information/information.service';


@Component({
  selector: 'app-updatecoffee',
  templateUrl: './updatecoffee.page.html',
  styleUrls: ['./updatecoffee.page.scss'],
})
export class UpdatecoffeePage implements OnInit {

  coffeeShop: CoffeeShop;

  coffeename: string;

  image_represent: any;
  image_file: File = null;

  description: string;
  min_price: number;
  max_price: number;

  listHour: string[] = [];
  value: string;
  listMinute: string[] = [];

  opentime: string[] = [];
  closetime: string[] = [];
  hourOpen: string;
  minuteOpen: string;
  hourClose: string;
  minuteClose: string;

  phonenumber: string;
  location: string;
  latitude: string;
  longitude: string;

  constructor(private route: ActivatedRoute,private toastUtils : ToastUtils,
    private loadingUtils: LoadingUtils,private infoService: InformationService,private router: Router) {
    this.coffeeShop = JSON.parse(this.route.snapshot.paramMap.get('cafeObj'));
    this.coffeename = this.coffeeShop.name;
    this.description = this.coffeeShop.description;
    this.image_represent = this.coffeeShop.image_represent;
    this.min_price = this.coffeeShop.minimum_price;
    this.max_price = this.coffeeShop.max_price;
    this.phonenumber = this.coffeeShop.phone_number;
    this.location = this.coffeeShop.location;
    this.longitude = this.coffeeShop.longitude;
    this.latitude = this.coffeeShop.latitude;

    this.opentime = this.coffeeShop.open_time.split(":");
    this.closetime = this.coffeeShop.closed_time.split(":");

    this.hourOpen = this.opentime[0];
    this.minuteOpen = this.opentime[1];

    this.hourClose = this.closetime[0];
    this.minuteClose = this.closetime[1];

    console.log(this.image_represent);
  }

  ngOnInit() {
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


  async chooseFromGallery() {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    this.image_file = await this.getFileFromUrl(image.webPath);
    this.image_represent = image.webPath;
  }

  async getFileFromUrl(url: string, defaultType = 'image/jpeg') {
    const fileName = new Date().getTime() + '.jpeg';
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, {
      type: data.type || defaultType,
    });
  }

  async clickUpdateCoffee(){
    if (this.coffeename === undefined || this.description === undefined || this.image_represent === undefined ||
      this.min_price === undefined || this.max_price === undefined || this.phonenumber === undefined || this.location === undefined
      || this.latitude === undefined || this.longitude === undefined || this.hourOpen === undefined || this.hourClose === undefined
      || this.minuteOpen === undefined || this.minuteClose === undefined) {
      this.toastUtils.presentToastError('Các ô không được để trống!!');
    } else {
      this.loadingUtils.presentLoading('Đang chỉnh sửa quán coffee cho bạn');
      const coffee = new FormData();
      coffee.append('name', this.coffeename);
      coffee.append('description', this.description);
      if(this.image_file){
        coffee.append('image_represent', this.image_file);
      }
      coffee.append('minimum_price', `${this.min_price}`);
      coffee.append('max_price', `${this.max_price}`);
      coffee.append('open_time', this.hourOpen + ':' + this.minuteOpen + ':00');
      coffee.append('closed_time', this.hourClose + ':' + this.minuteClose + ':00');
      coffee.append('phone_number', this.phonenumber);
      coffee.append('location', this.location);
      coffee.append('latitude', this.latitude);
      coffee.append('longitude', this.longitude);
      const check = await this.infoService.updateCoffee(coffee,this.coffeeShop.id);
      console.log(check);
      if (check > 0) {
        this.toastUtils.presentToastSuccess('Chỉnh sửa quán thành công');
        const checkstring = JSON.stringify(check);
        console.log(check);
        this.router.navigate(['addcoffeecategory', checkstring]);
      }
      this.loadingUtils.dismiss();
    }
  }
}
