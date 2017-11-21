import { Injectable } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';

import { Storage } from '@ionic/storage';

import { SmartAudio } from '../../providers/smart-audio/smart-audio';
 
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
 
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http, public smartAudio: SmartAudio, public loadingCtrl: LoadingController) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'inventories.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
 
  fillDatabase() {
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }
 
  getAllInventory(barcode: String) {
    // this.presentLoadingDefault();
    return this.database.executeSql("SELECT * FROM inventoryTable WHERE barcode = ?", [barcode]).then((data) => {
      let inventories = [];
      if (data.rows.length > 0) {
        this.smartAudio.play('yes');
        for (var i = 0; i < data.rows.length; i++) {
          inventories.push({ name: data.rows.item(i).name, details: data.rows.item(i).details, sizes: data.rows.item(i).sizes ,jta: data.rows.item(i).jta, barcode: data.rows.item(i).barcode });
        }
      }
      else{
        this.smartAudio.play('no');
        inventories=null;
      }
      return inventories;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
  // presentLoadingDefault() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  
  //   loading.present();
  
  //   setTimeout(() => {
  //     loading.dismiss();
  //   }, 1000);
  // }
}