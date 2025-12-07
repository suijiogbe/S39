import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  data: any[] = [];
  error: string | null = null;
  chart: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getChart2()
      .then(data => {
        this.data = data;
        this.createChart();
      })
      .catch(err => {
        this.error = err.message || 'Failed to load chart';
      });
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.data.map(d => d.name),
        datasets: [{
          data: this.data.map(d => d.reduction),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0'
          ],
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}
