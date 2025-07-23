// src/app/shared/components/sidebar/sidebar.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  translations: any = {};
  currentLanguage: string = 'th';
  isReportExpanded = false;
  isSettingExpanded = false;
  
  private translationSubscription?: Subscription;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('📋 Sidebar component initialized');
    
    // รับภาษาปัจจุบัน
    this.currentLanguage = this.languageService.getCurrentLanguage();
    
    // Subscribe to translation changes
    this.translationSubscription = this.languageService.getTranslations$().subscribe({
      next: (translations) => {
        console.log('🔄 Sidebar received new translations:', translations);
        this.translations = translations;
        this.currentLanguage = this.languageService.getCurrentLanguage();
        
        // Force change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        
        console.log('✅ Sidebar state updated for language:', this.currentLanguage);
      },
      error: (error) => {
        console.error('❌ Error in sidebar translation subscription:', error);
      }
    });

    // รับ translations เริ่มต้น
    this.translations = this.languageService.getTranslations();
  }

  ngOnDestroy() {
    console.log('🚪 Sidebar component destroyed');
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
  }

  toggleReport() {
    console.log('📊 Toggle report menu:', !this.isReportExpanded);
    this.isReportExpanded = !this.isReportExpanded;
  }

  toggleSetting() {
    console.log('⚙️ Toggle setting menu:', !this.isSettingExpanded);
    this.isSettingExpanded = !this.isSettingExpanded;
  }

  isActiveRoute(route: string): boolean {
    const isActive = this.router.url === route;
    return isActive;
  }

  // Helper method สำหรับ template
  getTranslation(key: string, fallback?: string): string {
    const keys = key.split('.');
    let translation = this.translations;
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    const result = translation || fallback || key;
    return result;
  }

  // Navigation methods
  navigateTo(route: string) {
    console.log('🧭 Navigating to:', route);
    this.router.navigate([route]);
  }

  // ตรวจสอบว่ามีการแปลหรือไม่
  hasTranslations(): boolean {
    return Object.keys(this.translations).length > 0;
  }

  // Safe translation method with better error handling
  t(key: string, fallback?: string): string {
    try {
      const translation = this.getTranslation(key);
      return translation !== key ? translation : (fallback || key);
    } catch (error) {
      console.warn('Translation error for key:', key, error);
      return fallback || key;
    }
  }
}