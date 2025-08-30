import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { ScrollToTopService } from './services/scroll-to-top.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private readonly languageService = inject(LanguageService);
  // Inject the ScrollToTopService to ensure it's initialized
  private readonly scrollToTopService = inject(ScrollToTopService);

  ngOnInit() {
    // Subscribe to language changes
    this.languageService.language$.subscribe(lang => {
      // Set the lang attribute on the root element
      document.documentElement.setAttribute('lang', lang);
    });
  }
}
