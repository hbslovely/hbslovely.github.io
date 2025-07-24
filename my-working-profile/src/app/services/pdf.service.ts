import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  async generatePdf(elementId: string, filename: string = 'cv.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found');
      return;
    }

    try {
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  async generateBeautifulPdf(data: any): Promise<void> {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set default font
    pdf.setFont('helvetica');

    // Add header
    this.addHeader(pdf, data.personalInfo);

    // Add sections
    let yPosition = 60;
    yPosition = this.addSkillsSection(pdf, data.skills, yPosition);
    yPosition = this.addExperienceSection(pdf, data.experience, yPosition);
    yPosition = this.addProjectsSection(pdf, data.projects, yPosition);

    // Save the PDF
    pdf.save('cv.pdf');
  }

  private addHeader(pdf: jsPDF, personalInfo: any): void {
    // Add name
    pdf.setFontSize(24);
    pdf.setTextColor(33, 33, 33);
    pdf.text(personalInfo.name, 20, 20);

    // Add title
    pdf.setFontSize(16);
    pdf.setTextColor(100, 100, 100);
    pdf.text(personalInfo.title, 20, 30);

    // Add contact info
    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    const contactInfo = [
      `Email: ${personalInfo.email}`,
      `Phone: ${personalInfo.phone}`,
      `Location: ${personalInfo.location}`,
      `LinkedIn: ${personalInfo.linkedin}`
    ];
    contactInfo.forEach((info, index) => {
      pdf.text(info, 20, 40 + (index * 5));
    });
  }

  private addSkillsSection(pdf: jsPDF, skills: any, startY: number): number {
    pdf.setFontSize(16);
    pdf.setTextColor(33, 33, 33);
    pdf.text('Technical Skills', 20, startY);

    let yPos = startY + 10;
    Object.entries(skills.technicalSkills).forEach(([category, skillList]: [string, any]) => {
      // Add category
      pdf.setFontSize(12);
      pdf.setTextColor(66, 66, 66);
      pdf.text(this.formatCategory(category), 20, yPos);

      // Add skills
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      const skillsText = (skillList as string[]).join(', ');
      const lines = pdf.splitTextToSize(skillsText, 170);
      pdf.text(lines, 20, yPos + 5);

      yPos += 15 + (lines.length * 5);
    });

    return yPos + 10;
  }

  private addExperienceSection(pdf: jsPDF, experience: any, startY: number): number {
    pdf.setFontSize(16);
    pdf.setTextColor(33, 33, 33);
    pdf.text('Work Experience', 20, startY);

    let yPos = startY + 10;
    experience.workExperience.forEach((exp: any) => {
      // Company and position
      pdf.setFontSize(12);
      pdf.setTextColor(66, 66, 66);
      pdf.text(`${exp.company} - ${exp.position}`, 20, yPos);

      // Duration
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${exp.startDate} - ${exp.endDate || 'Present'}`, 20, yPos + 5);

      // Description
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      const lines = pdf.splitTextToSize(exp.description, 170);
      pdf.text(lines, 20, yPos + 10);

      yPos += 20 + (lines.length * 5);
    });

    return yPos + 10;
  }

  private addProjectsSection(pdf: jsPDF, projects: any, startY: number): number {
    pdf.setFontSize(16);
    pdf.setTextColor(33, 33, 33);
    pdf.text('Projects', 20, startY);

    let yPos = startY + 10;
    projects.projects.forEach((project: any) => {
      // Project name
      pdf.setFontSize(12);
      pdf.setTextColor(66, 66, 66);
      pdf.text(project.name, 20, yPos);

      // Duration and role
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${project.duration} | ${project.role}`, 20, yPos + 5);

      // Description
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      const lines = pdf.splitTextToSize(project.description, 170);
      pdf.text(lines, 20, yPos + 10);

      // Technologies
      const techText = `Technologies: ${project.technologies.join(', ')}`;
      const techLines = pdf.splitTextToSize(techText, 170);
      pdf.text(techLines, 20, yPos + 15 + (lines.length * 5));

      yPos += 25 + (lines.length * 5) + (techLines.length * 5);
    });

    return yPos + 10;
  }

  private formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
} 