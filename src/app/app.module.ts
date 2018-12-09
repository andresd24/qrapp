import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage, HistoryPage, MapPage } from '../pages/index.pages';

//plug ins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts} from '@ionic-native/contacts';

// serivces
import { HistoryService } from '../providers/history/history';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    HistoryPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAb7TJDyFJi3ONuwOb1XgDc0KX9lzab8TE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    HistoryPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,  
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistoryService
  ]
})
export class AppModule {}
