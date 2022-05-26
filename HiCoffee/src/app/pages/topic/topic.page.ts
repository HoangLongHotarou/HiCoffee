import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
  
})
export class TopicPage implements OnInit  {

  private form = [
      { val: 'Yên tĩnh', isChecked: true },
      { val: 'Phong cảnh', isChecked: false },
      { val: 'Truyền thống', isChecked: false },
      { val: 'Manga/Anime', isChecked: false },
      { val: 'Nhà hàng', isChecked: false },
      { val: 'Nhượng quyền thương hiệu', isChecked: false },
      { val: 'Sách', isChecked: false },
      { val: 'Acoustic', isChecked: false },
      { val: 'Sân vườn', isChecked: false },
      { val: 'Thú cưng', isChecked: false },
      { val: '24h', isChecked: false },
      { val: 'Co-Working Space', isChecked: false }
  ];
  constructor() { }
  ngOnInit() {
  }

  _getSelectedItem(selectedItem){
    console.log('before' + selectedItem.isChecked)
    this.form.forEach(item => {
      if(item.val == selectedItem.val){
        item.isChecked = selectedItem.isChecked
      }
    });

    console.log(this.form)
  }
}
