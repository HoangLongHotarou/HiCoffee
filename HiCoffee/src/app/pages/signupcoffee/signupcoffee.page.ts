import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { CoffeeShopCreate } from 'src/app/interfaces/coffeeshopcreate';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

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

  //time
  hour_open: string;
  minute_open: string;

  hour_close: string;
  minute_close: string;

  open_time: string;
  close_time: string;

  phonenumber: string;
  location: string;
  latitude: string;
  longitude: string;

  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  constructor(public toastController: ToastController, private fetchAPI: FetchAPIService, public loadingController: LoadingController) { }

  async presentSpace() {
    const toast = await this.toastController.create({
      message: 'Các ô không được để trống!',
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

  ngOnInit(): void {

  }

  async clickSignupCoffee() {
    if (this.coffeename == undefined || this.description == undefined || this.image_represent == undefined ||
      this.min_price == undefined || this.max_price == undefined || this.phonenumber == undefined || this.location == undefined
      || this.latitude == undefined || this.longitude == undefined || this.hour_open == undefined || this.hour_close == undefined
      || this.minute_open == undefined || this.minute_close == undefined) {
      this.presentSpace();
    } else {
      if (Number.parseInt(this.hour_close) > 24 || Number.parseInt(this.hour_close) < 0 || Number.parseInt(this.hour_open) > 24 || Number.parseInt(this.hour_open) < 0 ||
        Number.parseInt(this.minute_open) > 60 || Number.parseInt(this.minute_open) < 0 || Number.parseInt(this.minute_close) > 60 || Number.parseInt(this.minute_close) < 0) {
        this.presentErrorTime();
      }
      else {
        if (Number.parseInt(this.hour_open) < 10) {
          this.hour_open = "0" + this.hour_open;
        }
        if (Number.parseInt(this.hour_close) < 10) {
          this.hour_close = "0" + this.hour_close;
        }
        if (Number.parseInt(this.minute_open) < 10) {
          this.minute_open = "0" + this.minute_open;
        }
        if (Number.parseInt(this.minute_close) < 10) {
          this.minute_close = "0" + this.minute_close;
        }
        // const coffee = {
        //   name: this.coffeename,
        //   description: this.description,
        //   image_represent: this.image_file,
        //   total_rate: 5,
        //   min_price: this.min_price,
        //   max_price: this.max_price,
        //   open_time: this.hour_open + ":" + this.minute_open + ":00",
        //   closed_time: this.hour_close + ":" + this.minute_close + ":00",
        //   phone_number: this.phonenumber,
        //   location: this.location,
        //   latitude: this.latitude,
        //   longitude: this.longitude,
        // }
        // let coffeeJSon =  JSON.stringify(coffee);
        let coffee = new FormData();
        coffee.append('name', this.coffeename);
        coffee.append('description', this.description);
        coffee.append('total_rate', '5');
        coffee.append('image_represent', this.image_file);
        coffee.append('phone_number', this.phonenumber);
        console.log(coffee);
        let check = await this.signUpCoffee(coffee);
        console.log(check);
        if (check == true) {
          this.presentSucess();
          console.log('Success')
        } else {
          console.log('Error')
        }
      }
    }
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.image_file = <File>event.target.files[0];
    }
  }

  async signUpCoffee(coffee: any): Promise<boolean> {
    let check = true;
    await this.fetchAPI.postFile('location/coffeeshops/', coffee).then((res) => {
      console.log(res);
      if (res.status === 201) {
        coffee = res.data;
        console.log(coffee);
      } else {
        check = false;
      }
    });
    return check;
  }
  
}
