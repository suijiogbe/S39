import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  data: any[] = [];
  error: string | null = null;
  chart: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getChart1()
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
      type: 'bar',
      data: {
        labels: this.data.map(d => d.name),
        datasets: [{
          label: 'Total Cost (USD)',
          data: this.data.map(d => d.cost),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ],
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          x: { beginAtZero: true }
        }
      }
    });
  }
}
