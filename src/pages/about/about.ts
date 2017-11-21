import { Component } from '@angular/core';
import { NavController, PopoverController, Platform } from 'ionic-angular';

import { PopoverPage } from '../popover/popover'

import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  options : InAppBrowserOptions = {
    location : 'no',
    hidden : 'no',
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no' 
};

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, private iab: InAppBrowser, private platform:Platform) {

  }

  exitApp(){
    this.platform.exitApp();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.iab.create(url,target,this.options);
  }

}
