import { Component } from '@angular/core';
import { NavController, ToastController, PopoverController, Platform } from 'ionic-angular';

import { PopoverPage } from '../popover/popover';

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { PlatformRef } from '@angular/core/src/application_ref';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
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

  constructor(public popoverCtrl: PopoverController, private toastCtrl: ToastController, public navCtrl: NavController, private iab: InAppBrowser, private platform:Platform) {
    
  }

  exitApp(){
    this.platform.exitApp();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'To be implemented soon!',
      duration: 1500,
      position: 'middle',
      cssClass: "donateToast"
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
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

  // public openWithInAppBrowser(url : string){
  //   let target = "_blank";
  //   this.iab.create(url,target,this.options);
  // }
  
  // public openWithCordovaBrowser(url : string){
  //   let target = "_self";
  //   this.iab.create(url,target,this.options);
  // }  

}
