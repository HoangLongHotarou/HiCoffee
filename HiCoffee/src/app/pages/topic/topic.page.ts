import { InformationService } from 'src/app/services/information/information.service';
/* eslint-disable @typescript-eslint/naming-convention */
import LoadingUtils from 'src/app/utils/loading.utils';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-topics',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  categories: Category[];

  constructor(
    private fetchAPIInfo: InformationService,
    private fetchAPICtg: CategoryService,
    private loadingUtils: LoadingUtils,
    private router: Router
  ) { }
  async ngOnInit() {
    this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API\nVui lòng chờ');
    await this.fetchAPICtg.getAll().then((res) => {
      this.categories = res;
    });
    this.loadingUtils.dismiss();
  }

  async AddHobbies() {
    this.loadingUtils.presentLoading('Đang thêm sở thích');
    const checkedItems: Category[] = this.categories.filter(value => value.isChecked);
    const idChecked: number[] = checkedItems.map(value => value.id);
    const idCategoriesString = idChecked.toString();
    const hobbies = {
      id_categories: idCategoriesString
    };
    const check = await this.fetchAPIInfo.addHobbies(hobbies);
    if (check) {
      this.router.navigateByUrl('/tabs');
    }
    this.loadingUtils.dismiss();
  }
}
