import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, Platform } from 'ionic-angular';


@Component({
  templateUrl: 'popover.html'
})

export class PopoverPage {
  constructor(public viewCtrl: ViewController, private platform:Platform) {}

  close() {
    this.viewCtrl.dismiss();
  }

  exitApp(){
    this.platform.exitApp();
  }
}
