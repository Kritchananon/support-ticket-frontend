// src/app/shared/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  translations: any = {};
  currentLanguage: string = 'th';
  isLanguageDropdownOpen = false;
  isUserDropdownOpen = false;
  isLanguageLoading = false;
  
  private translationSubscription?: Subscription;
  private languageSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  constructor(
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('🎯 Navbar component initialized');
    
    // Reset loading state เมื่อเริ่มต้น
    this.languageService.resetLoadingState();
    
    // รับภาษาปัจจุบัน
    this.currentLanguage = this.languageService.getCurrentLanguage();
    console.log('📍 Initial language:', this.currentLanguage);

    // Subscribe to language changes
    this.languageSubscription = this.languageService.getCurrentLanguage$().subscribe({
      next: (language) => {
        console.log('🌍 Language changed to:', language);
        this.currentLanguage = language;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error in language subscription:', error);
      }
    });

    // Subscribe to translation changes
    this.translationSubscription = this.languageService.getTranslations$().subscribe({
      next: (translations) => {
        console.log('🔄 Navbar received new translations:', translations);
        this.translations = translations;
        this.cdr.detectChanges();
        
        console.log('✅ Navbar translations updated:', {
          currentLanguage: this.currentLanguage,
          hasTranslations: Object.keys(this.translations).length > 0
        });
      },
      error: (error) => {
        console.error('❌ Error in navbar translation subscription:', error);
      }
    });

    // Subscribe to loading state changes
    this.loadingSubscription = this.languageService.getLanguageLoading$().subscribe({
      next: (loading) => {
        console.log('⏳ Loading state changed:', loading);
        this.isLanguageLoading = loading;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error in loading subscription:', error);
      }
    });

    // รับค่าเริ่มต้น
    this.translations = this.languageService.getTranslations();
    this.isLanguageLoading = this.languageService.isLanguageLoading();
    
    console.log('🚀 Initial state:', {
      language: this.currentLanguage,
      hasTranslations: Object.keys(this.translations).length > 0,
      isLoading: this.isLanguageLoading
    });
  }

  ngOnDestroy() {
    console.log('🚪 Navbar component destroyed');
    
    // Unsubscribe จากทุก subscription
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  toggleLanguageDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    console.log('🎛️ Toggle language dropdown:', !this.isLanguageDropdownOpen);
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    this.isUserDropdownOpen = false;
  }

  toggleUserDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    console.log('👤 Toggle user dropdown:', !this.isUserDropdownOpen);
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isLanguageDropdownOpen = false;
  }

  changeLanguage(language: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    console.log('🌍 Changing language to:', language);
    
    if (language === this.currentLanguage) {
      console.log('⚠️ Language is already', language);
      this.closeDropdowns();
      return;
    }

    // เปลี่ยนภาษาผ่าน service (จะจัดการ loading state เอง)
    this.languageService.setLanguage(language);
    
    // ปิด dropdown
    this.closeDropdowns();
    
    console.log('🎯 Language change initiated for:', language);
  }

  getCurrentLanguageDisplay(): string {
    const display = this.currentLanguage === 'th' ? 'TH' : 'EN';
    console.log('🏷️ Current language display:', display);
    return display;
  }

  getLanguageFlag(): string {
    return this.currentLanguage === 'th' ? 'th' : 'en';
  }

  closeDropdowns() {
    console.log('❌ Closing all dropdowns');
    this.isLanguageDropdownOpen = false;
    this.isUserDropdownOpen = false;
  }

  // Helper methods สำหรับ template
  getTranslation(key: string, fallback?: string): string {
    const keys = key.split('.');
    let translation = this.translations;
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || fallback || key;
  }

  // ตรวจสอบว่ามีการแปลหรือไม่
  hasTranslations(): boolean {
    return Object.keys(this.translations).length > 0;
  }

  // Method สำหรับ force reset loading (กรณีติดค้าง)
  forceResetLoading() {
    console.log('🔄 Force reset loading state');
    this.languageService.resetLoadingState();
  }

  // สำหรับ debug
  debugTranslations() {
    console.log('🐛 Debug - Current translations:', this.translations);
    console.log('🐛 Debug - Current language:', this.currentLanguage);
    console.log('🐛 Debug - Is loading:', this.isLanguageLoading);
    console.log('🐛 Debug - Service loading state:', this.languageService.isLanguageLoading());
  }
}