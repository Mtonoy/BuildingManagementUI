import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, forkJoin, timeout } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ChartOptions } from '../../../../../shared/models/chart-options';
import { BuildingService, ChartMdoel } from 'src/app/core/services/building.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: '[nft-chart-card]',
  templateUrl: './nft-chart-card.component.html',
})
export class NftChartCardComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  buildingList = [
    {
      id: 1,
      name: 'Building-1',
      location: 'Dhaka',
    },
    {
      id: 2,
      name: 'Building-2',
      location: 'Dhaka',
    },
    {
      id: 3,
      name: 'Building-3',
      location: 'Dhaka',
    },
    {
      id: 4,
      name: 'Building-4',
      location: 'Dhaka',
    },
    {
      id: 5,
      name: 'Building-5',
      location: 'Dhaka',
    },
    {
      id: 6,
      name: 'Building-6',
      location: 'Dhaka',
    },
    {
      id: 7,
      name: 'Building-7',
      location: 'Dhaka',
    },
    {
      id: 8,
      name: 'Building-8',
      location: 'Dhaka',
    },
    {
      id: 9,
      name: 'Building-9',
      location: 'Dhaka',
    },
    {
      id: 10,
      name: 'Building-10',
      location: 'Dhaka',
    },
  ];
  object = [
    {
      id: 1,
      name: 'Object-1',
    },
  ];
  dataField = [
    {
      id: 1,
      name: 'DataField-1',
    },
    {
      id: 2,
      name: 'DataField-2',
    },
    {
      id: 3,
      name: 'DataField-3',
    },
    {
      id: 4,
      name: 'DataField-4',
    },
    {
      id: 5,
      name: 'DataField-5',
    },
    {
      id: 6,
      name: 'DataField-6',
    },
    {
      id: 7,
      name: 'DataField-7',
    },
    {
      id: 8,
      name: 'DataField-8',
    },
    {
      id: 9,
      name: 'DataField-9',
    },
    {
      id: 10,
      name: 'DataField-10',
    },
  ];
  chartData: ChartMdoel[] = [];
  selectedBuilding = 1;
  selectedObject = 0;
  selectedField = 0;
  startDate = new Date();
  endDate = new Date();
  prograssiveChart!: Chart;
  @ViewChild('progressiveLineChartCanvas') progressiveLineChartCanvas!: ElementRef;
  constructor(private themeService: ThemeService, private building: BuildingService, private elementRef: ElementRef) {}
  ngOnInit(): void {

    
    this.loadInitialData();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  loadData() {
    this.building
      .getReadings(this.selectedBuilding, this.selectedObject, this.selectedField, this.startDate, this.endDate)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.chartData = res;
          const data = [];
          for (let i = 0; i < this.chartData.length; i++) {
            data.push({ x: this.chartData[i].timestamp, y: this.chartData[i].value });
          }
          this.createChart(data);
        },
      });
  }
  loadInitialData() {
    const builging = this.building.getBuildings();
    const objects = this.building.getObjects();
    const datafield = this.building.getDataFields();
    forkJoin([builging, objects, datafield]).subscribe({
      next: (result) => {
        this.buildingList = result[0];
        this.object = result[1];
        this.buildingList = result[2];
      },
    });
  }

  createChart(data: any) {
    const bar = document.getElementById('dayWiseDelivery') as HTMLCanvasElement;
    if (!bar) {
      console.error('Bar chart element not found');
      return;
    }
    if (this.prograssiveChart) {
      this.prograssiveChart.destroy();
    }

    this.prograssiveChart = new Chart(bar, {
      type: 'line',
      data: {
        datasets: [this.createDataset(`Progressive Line Chart`, data, '#94E01F', ['#94E01F'])],
      },
      options: this.createChartOptions(200),
    });
  }

  private createDataset(
    label: string,
    data: any[], // Use any[] for the data
    backgroundColor: string,
    borderColor: string[],
  ): any {
    return {
      label: label,
      data: data,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 2,
      fill: false,
    };
  }

  private createChartOptions(max: number): any {
    return {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: max,
        },
      },
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
      },
    };
  }
}
