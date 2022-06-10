import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Information } from 'src/app/interfaces/infomation';
import { User } from 'src/app/interfaces/user';
import { LocalStoreService } from 'src/app/services/localstore.service';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { InformationService } from 'src/app/services/information/information.service';
import LoadingUtils from 'src/app/utils/loading.utils';
import AlertUtils from 'src/app/utils/alert.utils';

@Component({
  selector: 'app-info-update',
  templateUrl: './info-update.page.html',
  styleUrls: ['./info-update.page.scss'],
})
export class InfoUpdatePage implements OnInit, OnChanges {
  
  info: Information;
  user: User;

  email: string;
  lastName: string;
  firstName: string;
  imgSrc: string;
  role: number;
  date: any;
  imageLink: string;
  file: File;

  constructor(
    private localstore: LocalStoreService,
    private router: Router,
    private actionSheet: ActionSheetController,
    private informationService: InformationService,
    private loadingUtils: LoadingUtils,
    private alertUtils: AlertUtils,
  ) {
  }
  async ngOnChanges() {
    this.getInfoLocal();
  }

  async ngOnInit() {
    this.getInfoLocal();
  }

  async getInfoLocal() {
    this.info = await this.localstore.loadInfo('info');
    console.log(this.info);
    this.user = this.info.user;
    // this.hobbies = this.info.info_hobbies;
    this.email = this.user.email;
    this.lastName = this.user.last_name;
    this.firstName = this.user.first_name;
    this.date = this.info.birthday;
    this.imageLink = this.info.image_link || '../../../assets/images/avatarDefault.jpg';
  }

  async chooseFromCamera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.file = await this.getFileFromUrl(image.webPath);
    this.imageLink = image.webPath;
    console.log(this.file);
    
  }

  async chooseFromGallery() {
    const image = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    this.file = await this.getFileFromUrl(image.webPath);
    this.imageLink = image.webPath;
    console.log(this.file);
  }

  async getFileFromUrl(url: string, defaultType = 'image/jpeg') {
    const fileName = new Date().getTime() + '.jpeg';
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], fileName, {
      type: data.type || defaultType,
    });
  }

  async getImage() {
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

  updateInfo() {
    this.loadingUtils.presentLoading('Vui lòng chờ');
    let formData = new FormData();
    if (this.file) {
      formData.append('image_link', this.file);
    }
    formData.append('birthday', this.date); 
    formData.append('user', this.info.user.id); 
    formData.append('first_name', this.firstName); 
    formData.append('last_name', this.lastName); 
    this.informationService.updateInformation(formData).then(res => {      
      console.log(res); 
      this.loadingUtils.dismiss();
      if (res) {
        this.updateInfoLocal(res);
        this.alertUtils.presentAlert('Thông báo', 'Đã cập nhật thông tin thành công!');  
      }
    });
  }

  updateInfoLocal(res: any) {
    this.info.image_link = res.image_link;
    this.info.birthday = res.birthday;
    this.info.user.last_name = res.user.last_name;
    this.info.user.first_name = res.user.first_name;
    this.localstore.saveInfo('info', this.info);
  }

  backPage() {
    this.router.navigateByUrl('/tabs/user');
  }
}
