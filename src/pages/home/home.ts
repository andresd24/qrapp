import { Component } from '@angular/core';

// plug ins
import { ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// services
import { HistoryService } from '../../providers/history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public text: any;
  public format: any;
  public cancelled: any;

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private historyService: HistoryService) {
  }

  scan() {
      console.log("realizing scan");

      if (!this.platform.is("cordova")) {
/*        this.historyService.add_to_history("http://www.google.com");
          this.historyService.add_to_history("geo:-12.1177550355307,-76.98039308031923");
          this.historyService.add_to_history(`BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` ); */
           this.historyService.add_to_history("MATMSG:TO:andresdev@gmail.com;SUB:Hello World;BODY:Greetings from Andres!;;"); 
          return;
      }

      this.barcodeScanner.scan().then((barcodeData) => {
          console.log("here");
          this.text = barcodeData.text;
          this.format = barcodeData.format;
          this.cancelled = barcodeData.cancelled;

          if (barcodeData.cancelled == false && barcodeData.text != null) {
              this.historyService.add_to_history(barcodeData.text);
          }

        }).catch(err => {
           console.log('Error', err);
           this.show_error(err);
       });

       console.log("finished scan");

  }

  show_error(message: string) {
       let toast = this.toastCtrl.create({
           message: message,
           duration: 2500,
           position: 'top'
       })

       toast.present()
  }

}
