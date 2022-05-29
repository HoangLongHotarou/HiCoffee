import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { CoffeeShop } from 'src/app/interfaces/coffeeshop';
import { Information } from 'src/app/interfaces/infomation';
import { LocalStoreService } from 'src/app/services/localstore.service';
import { Camera, CameraResultType, GalleryPhoto } from '@capacitor/camera';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.page.html',
  styleUrls: ['./write-feedback.page.scss'],
})
export class WriteFeedbackPage implements OnInit {

  coffeeShop: CoffeeShop;
  currentRate: number;

  info: Information;
  user: any;
  userName: string;

  imgPhotos: GalleryPhoto[];

  constructor(
    private route: ActivatedRoute,
    private localstore: LocalStoreService,
    private actionSheet: ActionSheetController,
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

  onRatingChange(rating){
    console.log('The evaluation was modified and now its value is: ',rating);   
  }

  async chooseFromCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);       
  }

  async chooseFromGallery() {
    const image = await Camera.pickImages({
      quality: 100,
      limit: 5,
    });
    console.log(image.photos);      
    this.imgPhotos = image.photos; 
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
    
  }
}
