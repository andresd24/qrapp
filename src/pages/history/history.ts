import { Component } from '@angular/core';
import { HistoryService } from '../../providers/history/history';
import { ScanData } from '../../models/scan-data.model';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  history: ScanData[] = [];

  constructor(private _historyService: HistoryService) {
  }

  ionViewDidLoad() {
      this.history = this._historyService.load_history();
  }

  open_scan(index: number) {

      this._historyService.open_scan(index);
  }

}
