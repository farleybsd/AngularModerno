import { Component, DestroyRef, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { PieChartConfig } from './pie-chart-config.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  template: `
  <canvas #canvas></canvas>
  `
})
export class PieChartComponent {

  private cnavasEl = viewChild.required<ElementRef>('canvas')
  config = input.required<PieChartConfig>();
  private destoryRef = inject(DestroyRef);
  private chartInstance: Chart | null = null;

  constructor() {
    effect(() => {
      this.destroyChartInstance();
      this.chartInstance = this.createChartInstance();
    });

    this.destoryRef.onDestroy(() => {
      this.chartInstance?.destroy();
    })
  }
  private createChartInstance() {
    return new Chart(this.cnavasEl().nativeElement, {
      type: 'pie',
      data: {
        labels: this.config().labels,
        datasets: [{
          label: this.config().dataLabel,
          data: this.config().data,
        }]
      }
    });
  }

  private destroyChartInstance() {
    this.chartInstance?.destroy();
  }

}
