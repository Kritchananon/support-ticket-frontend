// src/app/features/dashboard/dashboard.component.ts - Updated with Bootstrap Icons
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('monthlyLineChart', { static: false }) monthlyLineChartRef!: ElementRef;
  @ViewChild('categoryLineChart', { static: false }) categoryLineChartRef!: ElementRef;
  @ViewChild('pieChart', { static: false }) pieChartRef!: ElementRef;

  translations: any = {};
  selectedMonth: string = 'February';
  selectedYear: string = '2025';
  categorySummaryYear: string = '2025';

  private subscriptions: Subscription = new Subscription();

  // Stats data
  statsData = [
    { title: 'Total Ticket', value: '240', color: '#5873F8', icon: 'total' },
    { title: 'New Ticket', value: '20', color: '#FFC107', icon: 'new' },
    { title: 'In Progress', value: '20', color: '#1FBCD5', icon: 'progress' },
    { title: 'Complete', value: '210', color: '#28A745', icon: 'complete' }
  ];

  // Chart instances
  monthlyLineChart: Chart | null = null;
  categoryLineChart: Chart | null = null;
  pieChart: Chart | null = null;

  // Months data
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years = ['2023', '2024', '2025'];

  // Category data for pie chart
  categoryData = [
    { label: 'bugIssue', value: 40, color: '#5873F8' },
    { label: 'dataEntryIssue', value: 30, color: '#1FBCD5' },
    { label: 'systemDown', value: 20, color: '#DC3545' },
    { label: 'others', value: 10, color: '#6C757D' }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    const translationSub = this.languageService.getTranslations$().subscribe(translations => {
      this.translations = translations;
      this.updateSelectedMonth();
      // Delay chart update to allow DOM to be ready
      setTimeout(() => {
        this.updateChartLabels();
      }, 100);
    });
    
    this.subscriptions.add(translationSub);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createMonthlyLineChart();
      this.createCategoryLineChart();
      this.createPieChart();
    }, 200);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.destroyCharts();
  }

  private destroyCharts() {
    if (this.monthlyLineChart) {
      this.monthlyLineChart.destroy();
    }
    if (this.categoryLineChart) {
      this.categoryLineChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }

  private updateSelectedMonth() {
    if (this.translations.months) {
      this.selectedMonth = 'February'; // Keep English key for internal use
    }
  }

  private updateChartLabels() {
    if (this.monthlyLineChart && this.monthlyLineChartRef) {
      this.monthlyLineChart.destroy();
      this.createMonthlyLineChart();
    }
    if (this.categoryLineChart && this.categoryLineChartRef) {
      this.categoryLineChart.destroy();
      this.createCategoryLineChart();
    }
    if (this.pieChart && this.pieChartRef) {
      this.pieChart.destroy();
      this.createPieChart();
    }
  }

  private createMonthlyLineChart() {
    if (!this.monthlyLineChartRef?.nativeElement) return;
    
    const ctx = this.monthlyLineChartRef.nativeElement.getContext('2d');
    
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 
                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', 
                '24', '25', '26', '27', '28', '29', '30', '31'],
        datasets: [
          {
            label: this.translations.chartLabels?.newTicket || 'New Ticket',
            data: [0, 10, 20, 35, 40, 55, 65, 70, 80, 85, 90, 95, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10],
            borderColor: '#FFC107',
            backgroundColor: 'rgba(255, 193, 7, 0.3)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: this.translations.chartLabels?.complete || 'Complete',
            data: [0, 15, 25, 40, 50, 60, 70, 75, 80, 85, 88, 90, 89, 87, 85, 82, 80, 77, 75, 72, 70, 68, 65, 62, 60, 58, 55, 52, 50, 48, 45],
            borderColor: '#28A745',
            backgroundColor: 'rgba(40, 167, 69, 0.3)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              color: '#737373',
              font: {
                size: 12
              }
            },
            grid: {
              color: '#ECECEC'
            },
            border: {
              display: false
            },
            title: {
              display: true,
              text: this.translations.chartLabels?.ticket || 'Ticket',
              color: '#737373'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#737373',
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    };

    this.monthlyLineChart = new Chart(ctx, config);
  }

  private createCategoryLineChart() {
    if (!this.categoryLineChartRef?.nativeElement) return;
    
    const ctx = this.categoryLineChartRef.nativeElement.getContext('2d');
    
    const monthLabels = this.translations.monthsShort ? [
      this.translations.monthsShort.jan,
      this.translations.monthsShort.feb,
      this.translations.monthsShort.mar,
      this.translations.monthsShort.apr,
      this.translations.monthsShort.may,
      this.translations.monthsShort.jun,
      this.translations.monthsShort.jul,
      this.translations.monthsShort.aug,
      this.translations.monthsShort.sep,
      this.translations.monthsShort.oct,
      this.translations.monthsShort.nov,
      this.translations.monthsShort.dec
    ] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: this.translations.categories?.bugIssue || 'Bug Issue',
            data: [20, 25, 30, 35, 40, 38, 42, 45, 40, 35, 30, 25],
            borderColor: '#5873F8',
            backgroundColor: 'rgba(88, 115, 248, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: this.translations.categories?.dataEntryIssue || 'Data Entry Issue',
            data: [15, 20, 25, 22, 28, 30, 25, 20, 22, 25, 28, 30],
            borderColor: '#1FBCD5',
            backgroundColor: 'rgba(31, 188, 213, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: this.translations.categories?.systemDown || 'System Down',
            data: [10, 15, 20, 18, 22, 25, 20, 15, 18, 20, 22, 25],
            borderColor: '#DC3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: this.translations.categories?.others || 'Others',
            data: [5, 8, 10, 12, 15, 18, 15, 12, 10, 8, 10, 12],
            borderColor: '#6C757D',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              stepSize: 10,
              color: '#737373',
              font: {
                size: 12
              }
            },
            grid: {
              color: '#ECECEC'
            },
            border: {
              display: false
            },
            title: {
              display: true,
              text: this.translations.chartLabels?.ticket || 'Ticket',
              color: '#737373'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#737373',
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    };

    this.categoryLineChart = new Chart(ctx, config);
  }

  private createPieChart() {
    if (!this.pieChartRef?.nativeElement) return;
    
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.categoryData.map(item => 
          this.translations.categories?.[item.label] || item.label
        ),
        datasets: [{
          data: this.categoryData.map(item => item.value),
          backgroundColor: this.categoryData.map(item => item.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
                const percentage = Math.round((context.parsed * 100) / total);
                return `${context.label}: ${percentage}%`;
              }
            }
          }
        }
      }
    };

    this.pieChart = new Chart(ctx, config);
  }

  getStatTitle(stat: any): string {
    switch(stat.title) {
      case 'Total Ticket':
        return this.translations.dashboard?.totalTickets || 'Total Ticket';
      case 'New Ticket':
        return this.translations.dashboard?.newTickets || 'New Ticket';
      case 'In Progress':
        return this.translations.dashboard?.inProgress || 'In Progress';
      case 'Complete':
        return this.translations.dashboard?.completed || 'Complete';
      default:
        return stat.title;
    }
  }

  getStatIconClass(iconType: string): string {
    switch(iconType) {
      case 'total':
        return 'bi-ticket-detailed-fill';
      case 'new':
        return 'bi-ticket-perforated-fill';
      case 'progress':
        return 'bi-arrow-clockwise';
      case 'complete':
        return 'bi-check-circle-fill';
      default:
        return 'bi-circle';
    }
  }

  getTranslatedMonth(month: string): string {
    const monthKey = month.toLowerCase();
    return this.translations.months?.[monthKey] || month;
  }

  getCategoryLabel(categoryKey: string): string {
    return this.translations.categories?.[categoryKey] || categoryKey;
  }

  onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    // You can add logic here to update chart data based on selected month
    console.log('Selected month:', this.selectedMonth);
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    // You can add logic here to update chart data based on selected year
    console.log('Selected year:', this.selectedYear);
  }

  onCategorySummaryYearChange(event: any) {
    this.categorySummaryYear = event.target.value;
    // You can add logic here to update chart data based on selected year
    console.log('Selected category summary year:', this.categorySummaryYear);
  }
}