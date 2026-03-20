import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WasteManagementService } from '../services/waste-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { debounceTime, filter, finalize } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers: [DatePipe]

})
export class GenerateReportComponent implements OnInit, AfterViewInit {
  reportForm: FormGroup;
  reportType: string = 'pickupStats';
  dateRange = {
    startDate: '',
    endDate: ''
  };
  area: string = '';
  wasteType: string = '';
  chartInstance: any;
  
  reportData = {
    title: '',
    columns: [],
    data: [],
    summary: {
      totalPickups: 0,
      byWasteType: {},
      byDate: {}
    }
  };

  reportDataArray = Object.entries(this.reportData);



  loading: boolean = false;
  error: string = '';

  constructor(
    private wasteService: WasteManagementService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Initial Chart',
          data: [],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#F44336'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Waste Management Report'
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private initializeForm() {
    this.reportForm = this.fb.group({
      reportType: ['pickupStats'],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      area: [''],
      wasteType: [''],
      status: ['']
    });

    this.reportForm.valueChanges.pipe(
      debounceTime(500),
      filter(() => this.reportForm.valid)
    ).subscribe(() => {
      this.generateReport();
    });

  }

  private loadInitialData() {
    this.wasteService.getReportMetadata().subscribe({
      next: (metadata) => {
        // Load dropdown options from metadata
      },
      error: (error) => {
        this.error = 'Failed to load report options';
      }
    });
  }

  generateReport() {
    if (!this.reportForm.valid) {
      if (!this.reportForm.get('startDate').value) {
        this.error = 'Please select a start date';
        return;
      }
      if (!this.reportForm.get('endDate').value) {
        this.error = 'Please select an end date';
        return;
      }
      return;
    }
  
    this.loading = true;
    this.error = '';
  
    const params = {
      ...this.reportForm.value,
      startDate: this.datePipe.transform(this.reportForm.value.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.reportForm.value.endDate, 'yyyy-MM-dd')
    };
  
    this.wasteService.generateReport(params).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (response) => {
        if (!response?.data?.length) {
          this.error = 'No data available for the selected parameters';
          return;
        }
        this.updateReport(response);
        this.updateChart(response.chartData);
      },
      error: (error) => {
        this.error = 'Failed to generate report: ' + (error.message || 'Unknown error');
        console.error('Report generation error:', error);
      }
    });
  }

  private updateReport(response: any) {
    this.reportData = {
      title: response.title,
      columns: response.columns,
      data: response.data.map((item: any) => ({
        date: item.date,
        time: item.time,
        wasteType: item.wasteType,
        address: item.address,
        status: item.status,
      }))
      .sort((a, b) => {
        // Example: Sort by date, then time
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
      }),
    summary: response.summary
    };
  
  }

  private updateChart(chartData: any) {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: chartData.type || 'bar',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: chartData.label,
          data: chartData.data,
          backgroundColor: chartData.colors || [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#F44336'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.reportData.title
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  exportReport() {
    const params = {
      ...this.reportForm.value,
      format: 'pdf'
    };

    this.wasteService.exportReport(params).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `report-${new Date().getTime()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.error = 'Failed to export report';
      }
    });
  }

  // Add method to reset form
  resetForm() {
    this.reportForm.reset({
      reportType: 'pickupStats'
    });
    this.error = '';
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.initializeChart();
  }
}
