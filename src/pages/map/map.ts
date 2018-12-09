import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  lat: number;
  lng: number;
  center: string;

  constructor(public navParams: NavParams,
              private _viewCtrl: ViewController) {
  
      //this.lat = -12.1177550355307;
      //this.lng = -76.98039308031923;
      //this.center = this.lat + "," + this.lng;ç
      let cordsArray = this.navParams.get("cords").split(",");
      this.lat = Number(cordsArray[0].replace("geo:",""));
      this.lng = Number(cordsArray[1]);

      console.log(this.lat);
      console.log(this.lng);
    }

    close_modal() {
        this._viewCtrl.dismiss();
    }

  

     

}
