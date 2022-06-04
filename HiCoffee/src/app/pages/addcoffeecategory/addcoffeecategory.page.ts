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
    await this.fetchAPI.getAll().then((res)=>{
      this.categories = res;
    });
    this.loadingUtils.dismiss();
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
      console.log('Them category thanh cong');
      this.toastUltils.presentToastSuccess('Thêm quán thành công');
      this.router.navigateByUrl('/tabs/user').then(() => {
        window.location.reload();
      });
    } else {
      console.log('Error');
    }
    this.loadingUtils.dismiss();
  }

  checkeitem(category) {
    console.log(category);
  }
}
