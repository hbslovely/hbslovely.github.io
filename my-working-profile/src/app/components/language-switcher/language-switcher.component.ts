import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  languages: LanguageOption[] = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'vi',
      name: 'Vietnamese',
      flag: '🇻🇳'
    }
  ];

  constructor(private translate: TranslateService) {}

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }

  switchLanguage(langCode: string): void {
    this.translate.use(langCode);
  }
} 