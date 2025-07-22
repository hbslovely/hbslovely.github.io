import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { CV, PersonalInfo, WorkExperience, Education, Skills, Project } from '../models/cv.models';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
    providedIn: 'root'
})
export class CVService {
    constructor(private http: HttpClient) {}

    loadCV(): Observable<CV> {
        return forkJoin({
            personalInfo: this.http.get<PersonalInfo>('assets/json/personal-info.json'),
            experience: this.http.get<{ workExperience: WorkExperience[] }>('assets/json/experience.json'),
            education: this.http.get<{ education: Education[] }>('assets/json/education.json'),
            skills: this.http.get<Skills>('assets/json/skills.json'),
            projects: this.http.get<{ projects: Project[] }>('assets/json/projects.json')
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