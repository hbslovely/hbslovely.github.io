import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SearchService, SearchResult } from '../../core/services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ChipModule,
    SkeletonModule,
    RatingModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  selectedTypes: string[] = [];
  results: SearchResult[] = [];
  isLoading: boolean = false;
  searchTypes: { id: string, label: string }[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchTypes = this.searchService.getSearchTypes();

    // Get initial search term from query params
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchTerm = params['q'];
        this.performSearch(this.searchTerm);
      }
      if (params['types']) {
        this.selectedTypes = params['types'].split(',');
      }
    });

    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.updateQueryParams();
        this.isLoading = true;
        return this.searchService.search(term, this.selectedTypes);
      })
    ).subscribe(results => {
      this.results = results;
      this.isLoading = false;
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  performSearch(term: string) {
    this.isLoading = true;
    this.searchService.search(term, this.selectedTypes).subscribe(results => {
      this.results = results;
      this.isLoading = false;
    });
  }

  isTypeSelected(typeId: string): boolean {
    return this.selectedTypes.includes(typeId);
  }

  toggleType(typeId: string) {
    const index = this.selectedTypes.indexOf(typeId);
    if (index === -1) {
      this.selectedTypes.push(typeId);
    } else {
      this.selectedTypes.splice(index, 1);
    }
    this.performSearch(this.searchTerm);
    this.updateQueryParams();
  }

  private updateQueryParams() {
    const queryParams: any = { q: this.searchTerm };
    if (this.selectedTypes.length) {
      queryParams.types = this.selectedTypes.join(',');
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
