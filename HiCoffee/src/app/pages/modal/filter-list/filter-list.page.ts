import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.page.html',
  styleUrls: ['./filter-list.page.scss'],
})
export class FilterListPage implements OnInit {

  @Input() category$: Category[];

  listIDCategory: number[] = [];
  arrayTest: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  closeAction() {
    this.modalCtrl.dismiss();
  }

  refreshCategory() {
    // this.listIDCategory = [];    
    // console.log(this.listIDCategory);    
  }

  clickedEvent(event: number) {   
    if (this.listIDCategory.includes(event)) {
      const index = this.listIDCategory.indexOf(event);
      console.log(index);      
      this.listIDCategory.splice(index, 1);
      console.log(this.listIDCategory);      
    }
    else {
      this.listIDCategory.push(event);
      console.log(this.listIDCategory);  
    }  
  }
}
