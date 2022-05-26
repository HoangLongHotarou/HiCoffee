import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedBack } from 'src/app/interfaces/feed-back';
import { ImgPreviewModalPage } from 'src/app/pages/modal/img-preview-modal/img-preview-modal.page';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

  SlideOpts: any;
  @Input() feedBack: FeedBack;
  imgArr: string[];

  isShowMore: boolean;
  hiddenShowMore: boolean;
  moreText: string;

  constructor(
    private modalCtrl: ModalController
  ) {
    this.SlideOpts = {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 10
    };
    this.isShowMore = false;
    this.moreText = 'Xem thêm';    
    this.imgArr = [
      'https://images.unsplash.com/photo-1638913976381-5b8ed66c36d6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
      'https://images.unsplash.com/photo-1653161926627-c4b492a300c9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
      'https://images.unsplash.com/photo-1638913658179-18c9a9c943f7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
      'https://images.unsplash.com/photo-1653183693639-cffc9d75c769?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
      'https://images.unsplash.com/photo-1653330670377-dcbeb441f14d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870',
    ];
  }

  ngOnInit() {
    this.hiddenShowMore = (this.countWords(this.feedBack.feedback) > 20 ? false : true);
  }

  showMore() {
    if (this.isShowMore) {
      this.isShowMore = false;
      this.moreText = 'Xem thêm';
    }
    else {
      this.isShowMore = true;
      this.moreText = 'Rút gọn';
    }
  }

  countWords(s: string): number{
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').filter(function(str){return str!="";}).length;
  }

  async openPreview(imgArr: string[], index: number) {
    const modal = await this.modalCtrl.create({
      component: ImgPreviewModalPage,
      componentProps: {
        imgArr,
        index      
      },
      cssClass: 'imgPreviewContainer'
    });
    modal.present();
  }
}
