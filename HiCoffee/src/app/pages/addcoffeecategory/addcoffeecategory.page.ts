import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category';
import { FetchAPIService } from 'src/app/services/fetch-api.service';

@Component({
  selector: 'app-addcoffeecategory',
  templateUrl: './addcoffeecategory.page.html',
  styleUrls: ['./addcoffeecategory.page.scss'],
})
export class AddcoffeecategoryPage implements OnInit {
  
  loading: any;
  categories : Category[];

  constructor(private fetchAPI: FetchAPIService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.fetchAPI.get('location/categories/').then((res) => {
      this.categories = res.data;
      console.log(this.categories);
      this.loading.dismiss();
    });

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loading-style',
      message: 'Đang lấy dữ liệu từ API\nVui lòng chờ',
    });
    return this.loading.present();
  }
}
