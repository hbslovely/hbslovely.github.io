import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CVService } from './cv.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly cvService = inject(CVService);
  private readonly languageService = inject(LanguageService);

  // A4 dimensions in points (72 points per inch)
  private readonly A4_WIDTH = 595.28;  // 8.27 × 72
  private readonly A4_HEIGHT = 841.89; // 11.69 × 72
  private readonly MARGIN = 40;
  private readonly CONTENT_WIDTH = this.A4_WIDTH - (this.MARGIN * 2);
  private readonly SECTION_SPACING = 15;
  private readonly AVATAR_SIZE = 180;
  private readonly HEADER_SPACING = 20;

  private defineVietnameseFont(pdf: jsPDF): void {
    // Add Vietnamese font definition
    pdf.addFileToVFS('VNFont.ttf', 'VN_TOKEN');
    pdf.addFont('VNFont.ttf', 'VNFont', 'normal');
  }

  private setupPdfFonts(pdf: jsPDF): void {
    try {
      const currentLang = this.languageService.getCurrentLanguage();

      if (currentLang === 'vi') {
        // Setup Vietnamese font
        this.defineVietnameseFont(pdf);
        pdf.setFont('VNFont');

        // Enable Unicode encoding for Vietnamese characters
        (pdf as any).setLanguage("vi");
        (pdf as any).setR2L(false);
      } else {
        // For English, use Inter font which has good Unicode support
        pdf.setFont('Inter');
      }

      pdf.setFontSize(12);
      pdf.setProperties({
        title: 'CV',
        subject: 'Curriculum Vitae',
        author: 'Hong Phung Phat',
        keywords: 'CV, Resume',
        creator: 'CV Generator'
      });
    } catch (error) {
      console.error('Error setting up font:', error);
      // Fallback to built-in font if custom font fails to load
      pdf.setFont('Helvetica');
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
    pdf.setFont('Times-Roman', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(colors.primary);
    pdf.text(text, this.MARGIN, yPos);
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
    pdf.setFont('Times-Roman', 'italic');
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

    return `CV_Phat_Hong_${currentMonth}_${currentYear}_${language}.pdf`;
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

    // Setup fonts with Unicode support
    this.setupPdfFonts(pdf);

    // Define colors - using lighter shades
    const colors = {
      primary: '#2563eb',    // Changed from #3b82f6 to a darker blue
      text: '#1f2937',       // Dark text
      link: '#1d4ed8',       // Changed from #60a5fa to a darker blue for links
      subtext: '#4b5563',    // Dark gray for subtext
      background: '#ffffff',  // White background
      accent: '#3b82f6'      // Changed from #93c5fd to a medium-dark blue for accents
    };

    let yPos = this.MARGIN + 20; // Start with some padding from top

    // Add name
    pdf.setFont('Times-Roman', 'bold');
    pdf.setFontSize(28);
    pdf.setTextColor(colors.text);
    pdf.text(cv.personalInfo.name || '', this.MARGIN, yPos);

    // Add title
    yPos += this.getLineHeight(28);
    pdf.setFont('Times-Roman', 'normal');
    pdf.setFontSize(20);
    pdf.setTextColor(colors.text);
    pdf.text(cv.personalInfo.title || '', this.MARGIN, yPos);

    // Add avatar on the right
    try {
      const avatarX = this.A4_WIDTH - this.MARGIN - this.AVATAR_SIZE;
      const avatarY = this.MARGIN;
      const img = new Image();
      img.src = 'assets/images/avatar.jpeg';
      pdf.addImage(img, 'JPEG', avatarX, avatarY, this.AVATAR_SIZE, this.AVATAR_SIZE);
    } catch (error) {
      console.error('Error adding avatar:', error);
    }

    // Add personal info in vertical layout
    yPos += this.getLineHeight(20);
    pdf.setFont('Times-Roman', 'normal');
    pdf.setFontSize(13); // Slightly smaller font for contact info
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
    pdf.text(`${ cv.personalInfo.contact.phone } (Phone/Zalo/WhatsApp)`, this.MARGIN, yPos);

    // Add email as clickable link
    yPos += this.getLineHeight(13);
    pdf.setTextColor(colors.link);
    pdf.setDrawColor(colors.link);
    pdf.textWithLink(cv.personalInfo.contact.email || '', this.MARGIN, yPos, {
      url: `mailto:${ cv.personalInfo.contact.email }`
    });
    pdf.line(this.MARGIN, yPos + 2, this.MARGIN + pdf.getTextWidth(cv.personalInfo.contact.email || ''), yPos + 2);

    // Add LinkedIn
    yPos += this.getLineHeight(13);
    const linkedInUrl = cv.personalInfo.contact.linkedin || '';
    pdf.textWithLink(linkedInUrl, this.MARGIN, yPos, {
      url: linkedInUrl
    });
    pdf.line(this.MARGIN, yPos + 2, this.MARGIN + pdf.getTextWidth(linkedInUrl), yPos + 2);

    // Add extra spacing before Summary section
    yPos = Math.max(yPos + this.getLineHeight(13) + 20, this.MARGIN + this.AVATAR_SIZE + this.SECTION_SPACING);
    yPos = this.addSectionHeader(pdf, 'Summary', yPos, colors);

    // Add summary content with increased line height
    pdf.setFont('Times-Roman', 'normal');
    pdf.setFontSize(13);
    pdf.setTextColor(colors.text);
    const summaryLines = pdf.splitTextToSize(cv.personalInfo.shortSummary || '', this.CONTENT_WIDTH);
    pdf.text(summaryLines, this.MARGIN, yPos);

    // Calculate line height specifically for summary (1.5 times font size in points)
    const summaryLineHeight = 13 * 1.5;
    yPos += summaryLines.length * summaryLineHeight;

    // Add Experience Section
    yPos = this.addSectionHeader(pdf, 'Professional Experience', yPos, colors);
    yPos += this.getLineHeight(18);

    // Update Experience section
    if (cv.experience?.workExperience) {
      cv.experience.workExperience.forEach((exp, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 100);

        // Company name and position on same line
        pdf.setFont('Times-Roman', 'bold');
        pdf.setFontSize(15);
        pdf.setTextColor(colors.text);
        pdf.text(exp.company, this.MARGIN, yPos);

        // Add separator
        const separator = " | ";
        const companyWidth = pdf.getTextWidth(exp.company + separator);
        pdf.setFont('Times-Roman', 'normal');
        pdf.text(separator, this.MARGIN + companyWidth - pdf.getTextWidth(separator), yPos);

        // Position (smaller size)
        pdf.setFont('Times-Roman', 'bold');
        pdf.setFontSize(13); // Reduced from 15 to 13
        const positionY = yPos + 1; // Slight adjustment to align with company name
        pdf.text(exp.position, this.MARGIN + companyWidth, positionY);

        // Duration and location with lighter color
        yPos += this.getLineHeight(15);
        pdf.setFont('Times-Roman', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext);
        const duration = `${ exp.startDate } - ${ exp.endDate || 'Present' } | ${ exp.location }`;
        pdf.text(duration, this.MARGIN, yPos);

        // Achievements without bullets
        if (exp.achievements?.length) {
          yPos += this.getLineHeight(13);
          exp.achievements.forEach(achievement => {
            if (achievement) {
              yPos = this.checkPageBreak(pdf, yPos, 30);
              pdf.setFont('Times-Roman', 'normal');
              pdf.setFontSize(13);
              pdf.setTextColor(colors.text);
              const achievementLines = pdf.splitTextToSize(achievement, this.CONTENT_WIDTH - 40);
              pdf.text(achievementLines, this.MARGIN + 20, yPos);
              yPos += achievementLines.length * this.getLineHeight(13);
            }
          });
        }

        yPos += 15;
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
          pdf.setFont('Times-Roman', 'bold');
          pdf.setFontSize(14);
          pdf.setTextColor(colors.text);
          pdf.text(this.formatCategory(category), x, currentY);

          // Skills with lighter color and smaller font
          pdf.setFont('Times-Roman', 'normal');
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

      yPos = Math.max(leftColumnY, rightColumnY) + 5;
    }

    // Add Education Section
    yPos = this.checkPageBreak(pdf, yPos);
    yPos = this.addSectionHeader(pdf, 'Education', yPos, colors);
    yPos += this.getLineHeight(18);

    if (cv.education?.education) {
      cv.education.education.forEach(edu => {
        yPos = this.checkPageBreak(pdf, yPos, 80);

        // Degree and Field
        pdf.setFont('Times-Roman', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(colors.text);
        pdf.text(`${ edu.degree } in ${ edu.field }`, this.MARGIN, yPos);

        // Institution and Duration
        yPos += this.getLineHeight(14);
        pdf.setFont('Times-Roman', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext);
        pdf.text(`${ edu.institution } (${ edu.startDate } - ${ edu.endDate })`, this.MARGIN + 15, yPos);
        yPos += this.getLineHeight(13) + 20;
      });
    }

    // Add Projects Section
    yPos = this.checkPageBreak(pdf, yPos + 20);
    yPos = this.addSectionHeader(pdf, 'Notable Projects', yPos, colors);
    yPos += this.getLineHeight(18);

    if (cv.projects?.projects) {
      cv.projects.projects.forEach((project, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 100);

        // Project name and duration
        pdf.setFont('Times-Roman', 'bold');
        pdf.setFontSize(15);
        pdf.setTextColor(colors.text);
        pdf.text(project.name, this.MARGIN, yPos);

        // Duration (italics)
        yPos += this.getLineHeight(15);
        pdf.setFont('Times-Roman', 'italic');
        pdf.setFontSize(14);
        pdf.setTextColor(colors.subtext);
        pdf.text(project.duration || '', this.MARGIN, yPos);

        // Description with reduced spacing
        if (project.description) {
          yPos += this.getLineHeight(14) - 2;
          pdf.setFont('Times-Roman', 'normal');
          pdf.setFontSize(13);
          pdf.setTextColor(colors.text);
          const descLines = pdf.splitTextToSize(project.description, this.CONTENT_WIDTH - 20);
          pdf.text(descLines, this.MARGIN, yPos);
          yPos += descLines.length * this.getLineHeight(13) - 5;
        }

        // Project details with reduced spacing
        const detailSpacing = this.getLineHeight(13) - 3;

        // Scope
        if (project.scope) {
          yPos += detailSpacing;
          const labelWidth = this.addUnderlinedItalicLabel(pdf, 'Mainly Scope:', this.MARGIN, yPos, colors);
          pdf.setFont('Times-Roman', 'normal');
          pdf.text(` ${ project.scope }`, this.MARGIN + labelWidth, yPos);
        }

        // Technologies
        if (project.technologies?.length) {
          yPos += detailSpacing;
          const labelWidth = this.addUnderlinedItalicLabel(pdf, 'Technologies:', this.MARGIN, yPos, colors);
          pdf.setFont('Times-Roman', 'normal');
          const techText = project.technologies.join(', ');
          pdf.text(` ${ techText }`, this.MARGIN + labelWidth, yPos);
        }

        // Environment
        if (project.environment?.length) {
          yPos += detailSpacing;
          const labelWidth = this.addUnderlinedItalicLabel(pdf, 'Environment:', this.MARGIN, yPos, colors);
          pdf.setFont('Times-Roman', 'normal');
          const envText = project.environment.join(', ');
          pdf.text(` ${ envText }`, this.MARGIN + labelWidth, yPos);
        }

        // Role
        if (project.role) {
          yPos += detailSpacing;
          const labelWidth = this.addUnderlinedItalicLabel(pdf, 'Role:', this.MARGIN, yPos, colors);
          pdf.setFont('Times-Roman', 'normal');
          pdf.text(` ${ project.role }`, this.MARGIN + labelWidth, yPos);
        }

        // Add more spacing between projects (increased from previous value)
        yPos += this.getLineHeight(13) + 25; // Increased from just getLineHeight(13)

        // Add a subtle separator line between projects (except for the last one)
        if (index < cv.projects.projects.length - 1) {
          pdf.setDrawColor(colors.accent);
          pdf.setLineWidth(0.2);
          pdf.line(this.MARGIN + 40, yPos - 12, this.A4_WIDTH - this.MARGIN - 40, yPos - 12);
        }
      });
    }

    // Add footer with page numbers
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFont('Times-Roman', 'normal');
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
