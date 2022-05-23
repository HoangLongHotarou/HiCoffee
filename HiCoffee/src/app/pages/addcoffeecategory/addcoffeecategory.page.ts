import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category';
import { FetchAPIService } from 'src/app/services/fetch-api.service';
import LoadingUtils from 'src/app/utils/loading.utils';

@Component({
  selector: 'app-addcoffeecategory',
  templateUrl: './addcoffeecategory.page.html',
  styleUrls: ['./addcoffeecategory.page.scss'],
})
export class AddcoffeecategoryPage implements OnInit {

  categories: Category[];
  idCoffee: number;
  checkedItems: Category[]=[];
  listidcategory: number[];

  idliststring: string;

  constructor(private fetchAPI: FetchAPIService,
    private loadingUtils: LoadingUtils, 
    public loadingController: LoadingController,
    private route: ActivatedRoute,) 
    {
      this.idCoffee = JSON.parse(this.route.snapshot.paramMap.get('idCoffee'));
      //console.log(this.idCoffee);
    }

  ngOnInit() {
    this.loadingUtils.presentLoading('Đang lấy dữ liệu từ API\nVui lòng chờ');
    this.fetchAPI.get('location/categories/').then((res) => {
      this.categories = res.data;
      console.log(this.categories);
      this.loadingUtils.dismiss();
    });
  }
  async AddCoffeeCategory(){
    this.checkedItems =  this.categories.filter(value => value.isChecked);
    this.listidcategory= this.checkedItems.map(value => value.id);
    // console.log(this.checkedItems);
    // console.log(this.listidcategory);
    this.idliststring = this.listidcategory.toString();
    const category={
      id_categories : this.idliststring,
      type: false
    }
    let check = await this.AddCategory(this.idCoffee,category);
    if(check){
      console.log('Them category thanh cong');
    }else{
      console.log('Error');
    }
  }

  async AddCategory(idcoffee: number,category: any): Promise<boolean> {
    let check= true;
    await this.fetchAPI.post(`customer/cfsowner/${idcoffee}/cfstypes/`, category,true).then((res) => {
      console.log(res);
      if (res.status === 200) {
        category = res.data;
        console.log(category);
      } else{
        check = false;
      }
    });
    return check;
  }

  checkeitem(category){
    console.log(category);
  }
}
