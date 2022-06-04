import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  @Input() username: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  gotoNotifications(){
    this.router.navigateByUrl('/notification');
  }

}
