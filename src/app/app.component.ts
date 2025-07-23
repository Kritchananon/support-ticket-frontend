// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  template: `<app-layout></app-layout>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'support-ticket-frontend';
}