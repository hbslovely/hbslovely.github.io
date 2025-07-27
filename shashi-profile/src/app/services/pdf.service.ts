import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CvService } from './cv.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly cvService = inject(CvService);
  private readonly languageService = inject(LanguageService);

  // A4 dimensions in points (72 points per inch)
  private readonly A4_WIDTH = 595.28;  // 8.27 × 72
  private readonly A4_HEIGHT = 841.89; // 11.69 × 72
  private readonly MARGIN = 40;
  private readonly CONTENT_WIDTH = this.A4_WIDTH - (this.MARGIN * 2);
  private readonly SECTION_SPACING = 30; // Increased from 15 to 30 for better section separation
  private readonly HEADER_SPACING = 25; // Increased from 20 to 25 for consistent header spacing
  private readonly AVATAR_SIZE = 150; // Reduced from 180 to make it more compact
  private readonly SUB_SECTION_SPACING = 20; // New constant for spacing between items within a section

  private setupPdfFonts(pdf: jsPDF): void {
    try {
      // Set default font to Helvetica for better Unicode support
      pdf.setFont('helvetica');
      pdf.setFontSize(12);

      pdf.setProperties({
        title: 'Ms. Ninh Thi Quyen - Accounting & HR Professional',
        subject: 'Curriculum Vitae',
        author: 'Ms. Ninh Thi Quyen',
        keywords: 'CV, Resume, Accounting, HR, Professional',
        creator: 'CV Generator'
      });
    } catch (error) {
      console.error('Error setting up font:', error);
    }
  }

  private getLineHeight(fontSize: number): number {
    return fontSize * 1.5;
  }

  private checkPageBreak(pdf: jsPDF, yPos: number, requiredSpace: number = 100): number {
    if (yPos + requiredSpace > this.A4_HEIGHT - this.MARGIN) {
      pdf.addPage();
      return this.MARGIN;
    }
    return yPos;
  }

  private addSectionHeader(pdf: jsPDF, text: string, yPos: number, colors: any): number {
    // Add extra spacing before section header
    yPos += this.SECTION_SPACING;

    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(colors.primary);
    pdf.text(text, this.MARGIN, yPos);

    // Return position after header with consistent spacing
    return yPos + this.HEADER_SPACING;
  }

  private formatLocation(location: any): string {
    if (!location) return '';
    if (typeof location === 'string') return location;

    const parts = [];
    if (location.address) parts.push(location.address);
    if (location.district) parts.push(location.district);
    if (location.city) parts.push(location.city);
    if (location.country) parts.push(location.country);

    return parts.join(', ');
  }

  private addUnderlinedItalicLabel(pdf: jsPDF, text: string, xPos: number, yPos: number, colors: any): number {
    pdf.setFont('Inter', 'italic');
    pdf.setTextColor(colors.text);
    const textWidth = pdf.getTextWidth(text);
    pdf.text(text, xPos, yPos);

    // Add underline
    pdf.setDrawColor(colors.text);
    pdf.setLineWidth(0.5);
    pdf.line(xPos, yPos + 2, xPos + textWidth, yPos + 2);

    return textWidth;
  }

  private getFormattedFileName(): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();
    const language = this.languageService.getCurrentLanguage().toUpperCase();

    return `CV_Ninh_Thi_Quyen_${currentMonth}_${currentYear}_${language}.pdf`;
  }

  async generateBeautifulPdf(): Promise<void> {
    const cv = this.cvService.cv();
    if (!cv) {
      throw new Error('CV data not available');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true
    });

    // Setup fonts
    this.setupPdfFonts(pdf);

    // Define colors - using lighter shades
    const colors = {
      primary: '#2563eb',    // Main blue
      text: '#1f2937',       // Dark text
      link: '#1d4ed8',       // Dark blue for links
      subtext: '#60a5fa',    // Light blue for dates/locations
      background: '#ffffff',  // White background
      accent: '#3b82f6'      // Medium blue for accents
    };

    let yPos = this.MARGIN + 20; // Start with some padding from top

    // Calculate font sizes to match web view proportions
    const nameSize = 28;
    const prefixSize = nameSize * 0.6; // Prefix is 60% of name size, matching web view

    // Add prefix
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(prefixSize);
    pdf.setTextColor(colors.text); // Changed to black color for prefix
    const prefix = cv.personalInfo.prefix || '';
    pdf.text(prefix, this.MARGIN, yPos);
    const prefixWidth = pdf.getTextWidth(prefix);

    // Add name (with spacing after prefix)
    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(nameSize);
    pdf.setTextColor(colors.primary); // Blue color for name
    pdf.text(cv.personalInfo.name || '', this.MARGIN + prefixWidth + 10, yPos);

    // Add title with reduced spacing
    yPos += this.getLineHeight(nameSize) * 0.6;
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(20);
    pdf.setTextColor(colors.text);
    pdf.text(cv.personalInfo.title || '', this.MARGIN, yPos);

    // Add avatar on the right
    try {
      const avatarX = this.A4_WIDTH - this.MARGIN - this.AVATAR_SIZE;
      const avatarY = this.MARGIN;
      const img = new Image();
      img.src = 'assets/images/avatar.png';
      pdf.addImage(img, 'PNG', avatarX, avatarY, this.AVATAR_SIZE, this.AVATAR_SIZE, undefined, 'NONE');
    } catch (error) {
      console.error('Error adding avatar:', error);
    }

    // Add personal info with reduced spacing
    yPos += this.getLineHeight(20) * 0.7; // Reduced from 1 to 0.7
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(13);
    pdf.setTextColor(colors.text);

    // Add DOB
    yPos += this.getLineHeight(13);
    pdf.text(cv.personalInfo.dateOfBirth || '', this.MARGIN, yPos);

    // Add address
    yPos += this.getLineHeight(13);
    const location = this.formatLocation(cv.personalInfo.location);
    pdf.text(location, this.MARGIN, yPos);

    // Add phone with label
    yPos += this.getLineHeight(13);
    pdf.text(`${cv.personalInfo.contact.phone} (Phone/Zalo/WhatsApp)`, this.MARGIN, yPos);

    // Add email as clickable link
    yPos += this.getLineHeight(13);
    pdf.setTextColor(colors.link);
    pdf.setDrawColor(colors.link);
    pdf.textWithLink(cv.personalInfo.contact.email || '', this.MARGIN, yPos, {
      url: `mailto:${cv.personalInfo.contact.email}`
    });
    pdf.line(this.MARGIN, yPos + 2, this.MARGIN + pdf.getTextWidth(cv.personalInfo.contact.email || ''), yPos + 2);

    // Add extra spacing before Summary section (reduced)
    yPos = Math.max(yPos + this.getLineHeight(13), this.MARGIN + this.AVATAR_SIZE + this.SECTION_SPACING * 0.7);
    yPos = this.addSectionHeader(pdf, 'Summary', yPos, colors);

    // Add summary content
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(13);
    pdf.setTextColor(colors.text);
    const summaryLines = pdf.splitTextToSize(cv.personalInfo.shortSummary || '', this.CONTENT_WIDTH);
    pdf.text(summaryLines, this.MARGIN, yPos);
    yPos += summaryLines.length * this.getLineHeight(13);

    // Add Experience Section
    yPos = this.addSectionHeader(pdf, 'Professional Experience', yPos, colors);

    // Update Experience section
    if (cv.experience?.workExperience) {
      cv.experience.workExperience.forEach((exp, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 100);

        // Company name and position on same line
        pdf.setFont('Inter', 'bold');
        pdf.setFontSize(15);
        pdf.setTextColor(colors.text);
        pdf.text(exp.company, this.MARGIN, yPos);

        // Add separator
        const separator = " | ";
        const companyWidth = pdf.getTextWidth(exp.company + separator);
        pdf.setFont('Inter', 'normal');
        pdf.text(separator, this.MARGIN + companyWidth - pdf.getTextWidth(separator), yPos);

        // Position (normal weight)
        pdf.setFont('Inter', 'normal'); // Changed from bold to normal
        pdf.setFontSize(13);
        const positionY = yPos + 1;
        pdf.text(exp.position, this.MARGIN + companyWidth, positionY);

        // Duration and location with light blue color
        yPos += this.getLineHeight(15) * 0.8; // Reduced spacing
        pdf.setFont('Inter', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext); // Changed to light blue
        const duration = `${exp.startDate} - ${exp.endDate || 'Present'} | ${exp.location}`;
        pdf.text(duration, this.MARGIN, yPos);

        // Achievements without bullets
        if (exp.achievements?.length) {
          yPos += this.getLineHeight(13);
          exp.achievements.forEach(achievement => {
            if (achievement) {
              yPos = this.checkPageBreak(pdf, yPos, 30);
              pdf.setFont('Inter', 'normal');
              pdf.setFontSize(13);
              pdf.setTextColor(colors.text);
              const achievementLines = pdf.splitTextToSize(achievement, this.CONTENT_WIDTH - 40);
              pdf.text(achievementLines, this.MARGIN + 20, yPos);
              yPos += achievementLines.length * this.getLineHeight(13);
            }
          });
        }

        yPos += 15;
        // Add spacing between experience items
        yPos += this.SUB_SECTION_SPACING;
      });
    }

    // Update Skills section with header and lighter skills
    yPos = this.addSectionHeader(pdf, 'Technical Skills', yPos, colors);

    if (cv.skills?.technicalSkills) {
      const columnWidth = (this.CONTENT_WIDTH - 20) / 2;
      let leftColumnY = yPos;
      let rightColumnY = yPos;
      let isLeftColumn = true;

      Object.entries(cv.skills.technicalSkills).forEach(([ category, skills ]) => {
        if (Array.isArray(skills) && skills.length > 0) {
          const currentY = isLeftColumn ? leftColumnY : rightColumnY;
          const x = isLeftColumn ? this.MARGIN : this.MARGIN + columnWidth + 10;

          // Category name as header
          pdf.setFont('Inter', 'bold');
          pdf.setFontSize(14);
          pdf.setTextColor(colors.text);
          pdf.text(this.formatCategory(category), x, currentY);

          // Skills with lighter color and smaller font
          pdf.setFont('Inter', 'normal');
          pdf.setFontSize(12); // Smaller font size
          pdf.setTextColor(colors.subtext); // Lighter color
          const skillText = skills.join(' • ');
          const skillLines = pdf.splitTextToSize(skillText, columnWidth - 15);
          pdf.text(skillLines, x + 10, currentY + this.getLineHeight(14) - 2);

          const heightUsed = this.getLineHeight(14) + (skillLines.length * this.getLineHeight(12)) + 5;
          if (isLeftColumn) {
            leftColumnY += heightUsed;
          } else {
            rightColumnY += heightUsed;
          }
          isLeftColumn = !isLeftColumn;
        }
      });

      yPos = Math.max(leftColumnY, rightColumnY) + this.SUB_SECTION_SPACING;
    }

    // Add Education Section
    yPos = this.checkPageBreak(pdf, yPos);
    yPos = this.addSectionHeader(pdf, 'Education', yPos, colors);
    yPos += this.getLineHeight(18);

    // Update Education Section
    if (cv.education?.education) {
      cv.education.education.forEach((edu, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 80);

        // Degree and Field
        pdf.setFont('Inter', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(colors.text);
        pdf.text(`${edu.degree} in ${edu.field}`, this.MARGIN, yPos);

        // Institution and Duration with light blue color
        yPos += this.getLineHeight(14) * 0.8; // Reduced spacing
        pdf.setFont('Inter', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext); // Changed to light blue
        pdf.text(`${edu.institution} – ${edu.location} (${edu.startDate} - ${edu.endDate})`, this.MARGIN + 15, yPos);
        yPos += this.getLineHeight(13) * 0.8; // Reduced spacing
        // Add spacing between education items
        yPos += this.SUB_SECTION_SPACING;
      });
    }

    // Add footer with page numbers
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFont('Inter', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(colors.subtext);
      pdf.text(
        `Page ${ i } of ${ totalPages }`,
        this.A4_WIDTH / 2,
        this.A4_HEIGHT - 20,
        { align: 'center' }
      );
    }

    // Save the PDF with the dynamic filename
    pdf.save(this.getFormattedFileName());
  }

  private formatCategory(category: string): string {
    return category
      .split(/(?=[A-Z])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
