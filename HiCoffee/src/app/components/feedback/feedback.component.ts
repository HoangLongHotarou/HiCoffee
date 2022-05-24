import { Component, Input, OnInit } from '@angular/core';
import { FeedBack } from 'src/app/interfaces/feed-back';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

  SlideOpts: any;
  @Input() feedBack: FeedBack;

  isShowMore: boolean;
  hiddenShowMore: boolean;
  moreText: string;

  constructor() {
    this.SlideOpts = {
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 10
    };
    this.isShowMore = false;
    this.moreText = 'Xem thêm';    
  }

  ngOnInit() {
    this.hiddenShowMore = (this.countWords(this.feedBack.feedback) > 25 ? false : true);
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
}
