import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  // Data
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }/*, { data: [], label: 'Stock price' }*/];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stock price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];


  chartTypee = 'line';
  showLegend = false;

  // For search
  stock = 'AAPL';

  constructor(private http: HttpClient) {
  }

  getData() {
    // tslint:disable-next-line: max-line-length
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2020-01-01&to=2020-01-31`).subscribe(res => {
      const history = res['historical'];


      this.chartLabels = [];
      this.chartData[0].data = [];

      for (let entry of history) {
        this.chartLabels.push(entry.date);
        this.chartData[0].data.push(entry['close']);
      }
      console.log('this.chartLabels', this.chartLabels);
      console.log('this.chartData', this.chartData);
    });

  }

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartTypee = on ? 'line' : 'bar';
  }
}
