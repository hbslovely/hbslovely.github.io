import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CV } from '../../models/cv.models';
import { CVService } from '../../services/cv.service';

@Component({
    selector: 'app-cv-viewer',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatDividerModule
    ],
    templateUrl: './cv-viewer.component.html',
    styleUrls: ['./cv-viewer.component.scss']
})
export class CVViewerComponent implements OnInit {
    cv: CV | null = null;
    loading = true;
    error: string | null = null;

    constructor(private cvService: CVService) {}

    ngOnInit() {
        this.loadCV();
    }

    private loadCV() {
        this.cvService.loadCV().subscribe({
            next: (data) => {
                this.cv = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load CV data';
                this.loading = false;
                console.error('Error loading CV:', err);
            }
        });
    }

    exportToPDF() {
        this.cvService.exportToPDF('cv-content');
    }
} 