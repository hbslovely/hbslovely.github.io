import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map } from 'rxjs';
import { CV, PersonalInfo, WorkExperience, Education, Skills, Project } from '../models/cv.models';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
    providedIn: 'root'
})
export class CVService {
    private cvData = signal<CV | null>(null);
    private loading = signal<boolean>(true);
    private error = signal<string | null>(null);

    constructor(private http: HttpClient) {
        this.loadCV();
    }

    get cv() { return this.cvData.asReadonly(); }
    get isLoading() { return this.loading.asReadonly(); }
    get hasError() { return this.error.asReadonly(); }

    private loadCV() {
        this.loading.set(true);
        this.error.set(null);

        forkJoin({
            personalInfo: this.http.get<PersonalInfo>('assets/json/personal-info.json'),
            experience: this.http.get<{ workExperience: WorkExperience[] }>('assets/json/experience.json'),
            education: this.http.get<{ education: Education[] }>('assets/json/education.json'),
            skills: this.http.get<Skills>('assets/json/skills.json'),
            projects: this.http.get<{ projects: Project[] }>('assets/json/projects.json')
        }).subscribe({
            next: (data) => {
                this.cvData.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Failed to load CV data');
                this.loading.set(false);
                console.error('Error loading CV:', err);
            }
        });
    }

    async exportToPDF(elementId: string): Promise<void> {
        const element = document.getElementById(elementId);
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save('cv.pdf');
    }
} 