import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { LANGUAGES, type Language } from '../../models/language.models';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzDropDownModule,
    TranslateModule
  ],
  template: `
    <div class="language-switcher">
      <button 
        nz-button 
        nzType="text"
        [nzDropdownMenu]="menu"
        nz-dropdown
        class="language-button"
      >
        <span class="flag">{{ getCurrentLanguageFlag() }}</span>
        <span class="lang-code">{{ getCurrentLanguage().toUpperCase() }}</span>
      </button>
      <nz-dropdown-menu #menu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item *ngFor="let lang of languages" (click)="switchLanguage(lang.code)">
            <span class="flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: inline-block;
    }
    .language-button {
      padding: 4px 12px;
      height: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 4px;
      transition: all 0.3s;
    }
    .language-button:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    .flag {
      font-size: 20px;
      line-height: 1;
    }
    .lang-code {
      font-size: 14px;
      font-weight: 500;
    }
    .lang-name {
      margin-left: 8px;
      font-size: 14px;
    }
    [nz-menu-item] {
      display: flex;
      align-items: center;
      padding: 8px 12px;
    }
  `]
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  protected readonly languages = LANGUAGES;

  getCurrentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  getCurrentLanguageFlag(): string {
    return this.languages.find(lang => lang.code === this.getCurrentLanguage())?.flag || '🌐';
  }

  switchLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }
} 