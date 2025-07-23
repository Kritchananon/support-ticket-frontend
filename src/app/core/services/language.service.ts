// src/app/core/services/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translations {
  sidebar: {
    logo: string;
    dashboard: string;
    newTicket: string;
    allTickets: string;
    report: string;
    weeklyReport: string;
    monthlyReport: string;
    exportTicket: string;
    setting: string;
    general: string;
    userAccount: string;
    project: string;
    ticketCategories: string;
  };
  navbar: {
    language: string;
    thai: string;
    english: string;
    profile: string;
    settings: string;
    logout: string;
  };
  dashboard: {
    title: string;
    selectMonth: string;
    selectYear: string;
    totalTickets: string;
    newTickets: string;
    inProgress: string;
    completed: string;
    dailyChart: string;
    monthlyChart: string;
    categoryChart: string;
    allTicketsAtMonth: string;
    ticketSummaryByCategories: string;
    allTicketSummaryByCategories: string;
  };
  categories: {
    dataEntryIssue: string;
    systemDown: string;
    bugIssue: string;
    others: string;
  };
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  monthsShort: {
    jan: string;
    feb: string;
    mar: string;
    apr: string;
    may: string;
    jun: string;
    jul: string;
    aug: string;
    sep: string;
    oct: string;
    nov: string;
    dec: string;
  };
  chartLabels: {
    newTicket: string;
    complete: string;
    ticket: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<string>('th');
  private translations = new BehaviorSubject<Translations | any>({});
  private languageLoading = new BehaviorSubject<boolean>(false);

  private englishTranslations: Translations = {
    sidebar: {
      logo: "Support Ticket",
      dashboard: "Dashboard",
      newTicket: "New Ticket",
      allTickets: "All Tickets",
      report: "Report",
      weeklyReport: "Weekly Report",
      monthlyReport: "Monthly Report",
      exportTicket: "Export Ticket",
      setting: "Setting",
      general: "General",
      userAccount: "User Account",
      project: "Project",
      ticketCategories: "Ticket Categories"
    },
    navbar: {
      language: "Language",
      thai: "Thai",
      english: "English",
      profile: "My Profile",
      settings: "Settings",
      logout: "Logout"
    },
    dashboard: {
      title: "Dashboard",
      selectMonth: "Select Month",
      selectYear: "Select Year",
      totalTickets: "Total Tickets",
      newTickets: "New",
      inProgress: "In Progress",
      completed: "Completed",
      dailyChart: "Daily Report",
      monthlyChart: "Monthly Report",
      categoryChart: "Category Summary",
      allTicketsAtMonth: "All Tickets at Month",
      ticketSummaryByCategories: "Ticket Summary by Categories",
      allTicketSummaryByCategories: "All Ticket Summary by Categories"
    },
    categories: {
      dataEntryIssue: "Data Entry Issue",
      systemDown: "System Down/Unavailable",
      bugIssue: "Bug Issue",
      others: "Others"
    },
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    },
    monthsShort: {
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec"
    },
    chartLabels: {
      newTicket: "New Ticket",
      complete: "Complete",
      ticket: "Ticket"
    }
  };

  private thaiTranslations: Translations = {
    sidebar: {
      logo: "Support Ticket",
      dashboard: "แดชบอร์ด",
      newTicket: "สร้างตั๋วใหม่",
      allTickets: "ตั๋วทั้งหมด",
      report: "รายงาน",
      weeklyReport: "รายงานรายสัปดาห์",
      monthlyReport: "รายงานรายเดือน",
      exportTicket: "ส่งออกตั๋ว",
      setting: "ตั้งค่า",
      general: "ทั่วไป",
      userAccount: "บัญชีผู้ใช้",
      project: "โครงการ",
      ticketCategories: "หมวดหมู่ตั๋ว"
    },
    navbar: {
      language: "ภาษา",
      thai: "ไทย",
      english: "อังกฤษ",
      profile: "โปรไฟล์ของฉัน",
      settings: "ตั้งค่า",
      logout: "ออกจากระบบ"
    },
    dashboard: {
      title: "แดชบอร์ด",
      selectMonth: "เลือกเดือน",
      selectYear: "เลือกปี",
      totalTickets: "ตั๋วทั้งหมด",
      newTickets: "ตั๋วใหม่",
      inProgress: "กำลังดำเนินการ",
      completed: "เสร็จสิ้น",
      dailyChart: "รายงานรายวัน",
      monthlyChart: "รายงานรายเดือน",
      categoryChart: "สรุปตั๋วตามหมวดหมู่",
      allTicketsAtMonth: "ตั๋วทั้งหมดรายเดือน",
      ticketSummaryByCategories: "สรุปตั๋วตามหมวดหมู่",
      allTicketSummaryByCategories: "สรุปตั๋วทั้งหมดตามหมวดหมู่"
    },
    categories: {
      dataEntryIssue: "บันทึกข้อมูลไม่ได้",
      systemDown: "ระบบล้ม/ใช้งานไม่ได้",
      bugIssue: "ปัญหาเจอบัค",
      others: "อื่นๆ"
    },
    months: {
      january: "มกราคม",
      february: "กุมภาพันธ์",
      march: "มีนาคม",
      april: "เมษายน",
      may: "พฤษภาคม",
      june: "มิถุนายน",
      july: "กรกฎาคม",
      august: "สิงหาคม",
      september: "กันยายน",
      october: "ตุลาคม",
      november: "พฤศจิกายน",
      december: "ธันวาคม"
    },
    monthsShort: {
      jan: "ม.ค.",
      feb: "ก.พ.",
      mar: "มี.ค.",
      apr: "เม.ย.",
      may: "พ.ค.",
      jun: "มิ.ย.",
      jul: "ก.ค.",
      aug: "ส.ค.",
      sep: "ก.ย.",
      oct: "ต.ค.",
      nov: "พ.ย.",
      dec: "ธ.ค."
    },
    chartLabels: {
      newTicket: "ตั๋วใหม่",
      complete: "เสร็จสิ้น",
      ticket: "ตั๋ว"
    }
  };

  constructor() {
    // Load saved language preference or default to Thai
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'th';
    this.languageLoading.next(true);
    
    // Set initial translations without loading delay
    const initialTranslations = savedLanguage === 'en' 
      ? this.englishTranslations 
      : this.thaiTranslations;
    
    this.currentLanguage.next(savedLanguage);
    this.translations.next(initialTranslations);
    document.documentElement.lang = savedLanguage === 'en' ? 'en' : 'th';
    
    // Complete initial loading
    setTimeout(() => {
      this.languageLoading.next(false);
    }, 100);
  }

  getCurrentLanguage$(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  getTranslations$(): Observable<Translations> {
    return this.translations.asObservable();
  }

  getLanguageLoading$(): Observable<boolean> {
    return this.languageLoading.asObservable();
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  getTranslations(): Translations {
    return this.translations.value;
  }

  isLanguageLoading(): boolean {
    return this.languageLoading.value;
  }

  setLanguage(language: string): void {
    // Only show loading if language is actually changing
    if (language !== this.currentLanguage.value) {
      this.languageLoading.next(true);
    }
    
    this.currentLanguage.next(language);
    
    const selectedTranslations = language === 'en' 
      ? this.englishTranslations 
      : this.thaiTranslations;
    
    this.translations.next(selectedTranslations);
    
    // Save to localStorage
    localStorage.setItem('selectedLanguage', language);
    
    // Update document language attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'th';
    
    // Complete loading after a short delay
    setTimeout(() => {
      this.languageLoading.next(false);
    }, 200);
  }

  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'th' : 'en';
    this.setLanguage(newLang);
  }

  // Method for setting loading state manually if needed
  setLanguageLoading(loading: boolean): void {
    this.languageLoading.next(loading);
  }

  // Force reset loading state
  resetLoadingState(): void {
    this.languageLoading.next(false);
  }

  // Initialize service properly
  initializeService(): void {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'th';
    const translations = savedLanguage === 'en' 
      ? this.englishTranslations 
      : this.thaiTranslations;
    
    this.currentLanguage.next(savedLanguage);
    this.translations.next(translations);
    this.languageLoading.next(false);
    
    document.documentElement.lang = savedLanguage === 'en' ? 'en' : 'th';
  }

  // Helper methods for getting specific translations
  getMonthName(monthIndex: number): string {
    const months = Object.values(this.getTranslations().months);
    return months[monthIndex] || '';
  }

  getShortMonthName(monthIndex: number): string {
    const months = Object.values(this.getTranslations().monthsShort);
    return months[monthIndex] || '';
  }

  getCategoryName(categoryKey: string): string {
    const categories = this.getTranslations().categories;
    return (categories as any)[categoryKey] || categoryKey;
  }
}