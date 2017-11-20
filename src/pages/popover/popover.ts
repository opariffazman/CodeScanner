import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'popover.html'
})

export class PopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
