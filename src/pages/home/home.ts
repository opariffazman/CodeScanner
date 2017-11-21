import { DatabaseProvider } from './../../providers/database/database';

import { Component } from '@angular/core';
import { NavController, Platform, ToastController, PopoverController  } from 'ionic-angular';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { PopoverPage } from '../popover/popover'
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inventory = {};
  inventories = [];
  scannedCode = null;
  options: BarcodeScannerOptions;
 
  constructor(public popoverCtrl: PopoverController, private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.presentToast();
        
      }
    })
    
  }

  exitApp(){
    this.platform.exitApp();
  }

  scanCode() {

    this.options = {
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 0,
      disableSuccessBeep: true
    }

    this.barcodeScanner.scan(this.options).then(barcodeData => {
    this.scannedCode = barcodeData.text;
    this.loadInventoryData();
    }, 
    (err) => {
        console.log(' Error: ', err);
    });

 
  }
  
  loadInventoryData() {
    this.databaseprovider.getAllInventory(this.scannedCode).then(data => {
      this.inventories = data;
    })
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'This app is developed by courtesy of opariffazman for testing purposes only. Copyright© 2017 Ariff Azman',
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
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
}

