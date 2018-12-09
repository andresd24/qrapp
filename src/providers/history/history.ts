import { MapPage } from './../../pages/map/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts';

@Injectable()
export class HistoryService {

  private _history:ScanData[] = [];

  constructor(private iab: InAppBrowser,
              private _modalCtrl: ModalController,
              private _contacts: Contacts,
              private _platform: Platform,
              private _toastCtrl: ToastController) {}

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
          case "contact":
            this.createContact(scanData.info);  
            break;
          case "email":
            let htmlLink = scanData.info;
            
            htmlLink = htmlLink.replace("MATMSG:TO:","mailto:");
            htmlLink = htmlLink.replace(";SUB:","?subject=");
            htmlLink = htmlLink.replace(";BODY:","&body=");
            htmlLink = htmlLink.replace(";;","");
            htmlLink = htmlLink.replace(/ /g,"%20");
            
            this.iab.create(htmlLink, "_system");

            break;
          default:
            console.log("unsupported type");
      }
  }


  load_history() {
      return this._history;
  }

  private createContact(info) {
      let fields:any = this.parse_vcard(info);

      console.log("fields: " + fields["fn"] + " " + fields.tel[0].value[0]);

      let name = fields['fn'];
      let tel =  fields.tel[0].value[0];

      if (!this._platform.is("cordova")) {
          console.warn("Not in cellphone.  Can't create contact");
          this.createToast("Not in cellphone.  Can't create contact");
          return;
      }

      let contact:Contact = this._contacts.create();
      contact.name = new ContactName(null, name);
      contact.phoneNumbers = [ new ContactField('mobile', tel)];

      contact.save().then( () => {
          this.createToast("Contact " + name + " created!");
      }).catch((err)=> {
          this.createToast("Error: " + err);   
      });


  }

  private createToast(message: string) {
      this._toastCtrl.create({
          message: message,
          duration: 2500,
          position: 'top'
      }).present();
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

}
