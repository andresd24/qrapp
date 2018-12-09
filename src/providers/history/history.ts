import { MapPage } from './../../pages/map/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController } from 'ionic-angular';

@Injectable()
export class HistoryService {

  private _history:ScanData[] = [];

  constructor(private iab: InAppBrowser,
              private _modalCtrl: ModalController) {}

  add_to_history(text:string) {
      let data = new ScanData(text);

      this._history.unshift(data);
      console.log(this._history);

      this.open_scan(0);
  }

  open_scan(index: number) {
      let scanData = this._history[index];

      switch( scanData.type) {
          case "http":
            this.iab.create(scanData.info, "_system");
            break;
          case "map":
            this._modalCtrl.create(MapPage, {'cords': scanData.info}).present();
            break;  

          default:
            console.log("unsupported type");
      }
  }


  load_history() {
      return this._history;
  }

}
