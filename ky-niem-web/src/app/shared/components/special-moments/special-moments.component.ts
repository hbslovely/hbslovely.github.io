import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface SpecialMoment {
  id: string;
  image: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
}

interface SpecialMomentsData {
  sectionTitle: string;
  sectionSubtitle: string;
  footerQuote: {
    text: string;
    author: string;
  };
  moments: SpecialMoment[];
}

@Component({
  selector: 'app-special-moments',
  imports: [ CommonModule ],
  templateUrl: './special-moments.component.html',
  styleUrls: [ './special-moments.component.scss' ]
})
export class SpecialMomentsComponent implements OnInit {
  data: SpecialMomentsData = {
    sectionTitle: '',
    sectionSubtitle: '',
    footerQuote: {
      text: '',
      author: ''
    },
    moments: []
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<SpecialMomentsData>('assets/data/special-moments.json')
      .subscribe(data => {
        this.data = data;
      });
  }
}
