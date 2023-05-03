import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

ngOnInit(): void {
  this.doughnutChartData.datasets[0].data = this.data1;
}

@Input() title  : string = 'Sin Titulo';
@Input() data1  : number[] = [ 350, 450, 100 ];
@Input() labels : string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

// Doughnut
public doughnutChartData: ChartData<'doughnut'> = {
  labels: this.labels,
  datasets: [
    {
      data: this.data1,
      backgroundColor : [ '#6857E6' , '#009FEE' , '#F02059' ]
    }
  ],
};



public doughnutChartType: ChartType = 'doughnut';

}
