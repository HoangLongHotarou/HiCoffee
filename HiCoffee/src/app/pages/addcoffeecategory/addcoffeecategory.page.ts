/* eslint-disable @typescript-eslint/prefer-for-of */
import { CategoryService } from './../../services/category/category.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import LoadingUtils from 'src/app/utils/loading.utils';
import ToastUtils from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-addcoffeecategory',
  templateUrl: './addcoffeecategory.page.html',
  styleUrls: ['./addcoffeecategory.page.scss'],
})
export class AddcoffeecategoryPage implements OnInit {

  categories: Category[];
  theloai: Category[];
  idCoffee: number;
  checkedItems: Category[] = [];
  listidcategory: number[];

  idliststring: string;

  constructor(private fetchAPI: CategoryService,
    private loadingUtils: LoadingUtils,
    private toastUltils: ToastUtils,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.idCoffee = JSON.parse(this.route.snapshot.paramMap.get('idCoffee'));
    //console.log(this.idCoffee);
  }

  async ngOnInit() {
    this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API\nVui lòng chờ');
    await this.fetchAPI.getAll().then((res) => {
      this.categories = res;
    });
    await this.fetchAPI.getCategoryByIdCoffee(this.idCoffee).then((res) => {
      this.theloai = res;
    });
    this.loadingUtils.dismiss();
    //console.log(this.theloai);
    for (let i = 0; i < this.categories.length; i++) {
      for (let j = 0; j < this.theloai.length; j++) {
        if (this.categories[i].type === this.theloai[j].type) {
          this.categories[i].isChecked = true;
        }
      }
    }
  }
  async AddCoffeeCategory() {
    this.loadingUtils.presentLoading('Đang thêm thể loại');
    this.checkedItems = this.categories.filter(value => value.isChecked);
    this.listidcategory = this.checkedItems.map(value => value.id);
    this.idliststring = this.listidcategory.toString();
    const category = {
      id_categories: this.idliststring,
      type: false
    };
    const check = await this.fetchAPI.addCategory(this.idCoffee, category);
    if (check) {
      console.log('Thêm thể loại thành công');
      this.toastUltils.presentToastSuccess('Thêm thể loại thành công');
      const idCoffeeString = JSON.stringify(this.idCoffee);
      this.router.navigate(['coffeeimageadd', idCoffeeString]);
    } else {
      console.log('Error');
    }
    this.loadingUtils.dismiss();
  }

  checkeitem(category) {
    console.log(category);
  }
}
