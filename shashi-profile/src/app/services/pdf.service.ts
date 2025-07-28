import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CvService } from './cv.service';
import { LanguageService } from './language.service';
import { addInterFont } from "./jspdf-font";
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly cvService = inject(CvService);
  private readonly languageService = inject(LanguageService);
  private readonly translateService = inject(TranslateService);

  // A4 dimensions in points (72 points per inch)
  private readonly A4_WIDTH = 595.28;  // 8.27 × 72
  private readonly A4_HEIGHT = 841.89; // 11.69 × 72
  private readonly MARGIN = 40;
  private readonly CONTENT_WIDTH = this.A4_WIDTH - (this.MARGIN * 2);
  private readonly SECTION_SPACING = 10; // Increased from 30 for better section separation
  private readonly HEADER_SPACING = 25; // Reduced from 30 for better compactness
  private readonly AVATAR_SIZE = 130; // Reduced from 150 to make it more compact
  private readonly SUB_SECTION_SPACING = 25; // Increased from 20 for better item separation
  private readonly SECTION_HEADER_HEIGHT = 42; // New constant for header height
  private readonly CONTENT_LEFT_MARGIN = 40; // Reduced from 60 to 45
  private readonly SUMMARY_LINE_HEIGHT = 1.4; // New constant for summary line height
  private readonly BULLET_INDENT = 15; // New constant for bullet point indentation
  private readonly TEXT_INDENT = 25; // New constant for text after bullet point

  private setupPdfFonts(pdf: jsPDF): void {
    try {
      // Set default font to Inter
      pdf.setFont('Inter', 'normal');
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
    return fontSize * 1.7; // Increased from 1.5 to 1.7 for better readability
  }

  private checkPageBreak(pdf: jsPDF, yPos: number, requiredSpace: number = 100): number {
    if (yPos + requiredSpace > this.A4_HEIGHT - this.MARGIN) {
      pdf.addPage();
      return this.MARGIN;
    }
    return yPos;
  }

  private addSectionHeader(pdf: jsPDF, text: string, yPos: number, colors: any): number {
    yPos += this.SECTION_SPACING;

    // Add full-width background
    pdf.setFillColor(colors.headerBg);
    pdf.rect(0, yPos - this.SECTION_HEADER_HEIGHT/2, this.A4_WIDTH, this.SECTION_HEADER_HEIGHT, 'F');

    // Add section text - vertically centered
    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(colors.primary);
    const textY = yPos + 5; // Adjust for vertical centering
    pdf.text(text.toUpperCase(), this.MARGIN, textY);

    return yPos + this.HEADER_SPACING + 15; // Increased spacing after header
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
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const now = new Date();
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();
    const language = this.languageService.getCurrentLanguage().toUpperCase();

    return `CV_Ninh_Thi_Quyen_${ currentMonth }_${ currentYear }_${ language }.pdf`;
  }

  private drawBackgroundBox(pdf: jsPDF, x: number, y: number, width: number, height: number, colors: any): void {
    // Draw background
    pdf.setFillColor('#f0f7ff'); // Very light blue background
    pdf.rect(x, y, width, height, 'F');

    // Draw border
    pdf.setDrawColor(colors.subtext);
    pdf.setLineWidth(0.5);
    pdf.rect(x, y, width, height, 'S');
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

    addInterFont(pdf);

    // Setup fonts
    this.setupPdfFonts(pdf);

    // Define colors - using light blue theme to match web interface
    const colors = {
      primary: '#006aca',    // Main blue from nav-bar
      text: '#1e293b',       // Dark text for readability
      link: '#69b1ff',       // Light blue for links
      subtext: '#64748b',    // Medium gray for secondary text
      background: '#ffffff', // White background
      accent: '#e6f4ff',    // Very light blue for accents/lines
      headerBg: '#ebf5ff',   // Lighter blue background for section headers
      companyName: '#0f172a', // Near black for company names
      titleGrey: '#4b5563'   // Grey color for title/position
    };

    let yPos = this.MARGIN + 20;

    // Add header background with light blue color
    pdf.setFillColor(colors.headerBg);
    pdf.rect(0, 0, this.A4_WIDTH, this.MARGIN * 6, 'F');

    // Add subtle border at the bottom of header
    pdf.setDrawColor(colors.accent);
    pdf.setLineWidth(1);
    pdf.line(0, this.MARGIN * 6, this.A4_WIDTH, this.MARGIN * 6);

    // Add name section
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(16);
    pdf.setTextColor(colors.text);
    const prefix = cv.personalInfo.prefix || '';
    pdf.text(prefix, this.MARGIN, yPos);
    const prefixWidth = pdf.getTextWidth(prefix);

    // Add name
    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(28);
    pdf.setTextColor(colors.primary);
    const name = cv.personalInfo.name || '';
    pdf.text(name, this.MARGIN + prefixWidth + 10, yPos);

    // Add title with reduced spacing
    yPos += this.getLineHeight(28) * 0.7;
    pdf.setFont('Inter', 'medium');
    pdf.setFontSize(18);
    pdf.setTextColor(colors.titleGrey);  // Using grey color for title
    pdf.text(cv.personalInfo.title || '', this.MARGIN, yPos);

    // Add avatar with border
    try {
      const avatarX = this.A4_WIDTH - this.MARGIN - this.AVATAR_SIZE;
      const avatarY = this.MARGIN;

      // Add white background for avatar
      pdf.setFillColor(255, 255, 255);
      pdf.rect(avatarX - 2, avatarY - 2, this.AVATAR_SIZE + 4, this.AVATAR_SIZE + 4, 'F');

      // Add border
      pdf.setDrawColor('#e6f4ff');
      pdf.setLineWidth(1);
      pdf.rect(avatarX - 2, avatarY - 2, this.AVATAR_SIZE + 4, this.AVATAR_SIZE + 4, 'S');

      const img = new Image();
      img.src = 'assets/images/avatar.png';
      pdf.addImage(img, 'PNG', avatarX, avatarY, this.AVATAR_SIZE, this.AVATAR_SIZE, undefined, 'NONE');
    } catch (error) {
      console.error('Error adding avatar:', error);
    }

    // Add contact info in a more organized layout
    yPos += this.getLineHeight(18) * 0.8;
    const contactStartY = yPos;

    // Create two columns for contact info
    const contactColumnWidth = (this.A4_WIDTH - (this.MARGIN * 2) - this.AVATAR_SIZE - 40) / 2;

    // Left column
    let contactX = this.MARGIN;
    let contactY = contactStartY;

    // DOB
    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(colors.primary);
    pdf.text('Date of Birth:', contactX, contactY);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(colors.text);
    pdf.text(cv.personalInfo.dateOfBirth || '', contactX + 80, contactY);

    // Email
    contactY += this.getLineHeight(11) * 1.2;
    pdf.setFont('Inter', 'bold');
    pdf.setTextColor(colors.primary);
    pdf.text('Email:', contactX, contactY);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(colors.link);
    const email = cv.personalInfo.contact.email || '';
    pdf.textWithLink(email, contactX + 80, contactY, {
      url: `mailto:${email}`
    });
    // Add subtle underline for email
    pdf.setDrawColor(colors.link);
    pdf.setLineWidth(0.5);
    pdf.line(contactX + 80, contactY + 1, contactX + 80 + pdf.getTextWidth(email), contactY + 1);

    // Phone
    contactY += this.getLineHeight(11) * 1.2;
    pdf.setFont('Inter', 'bold');
    pdf.setTextColor(colors.primary);
    pdf.text('Phone:', contactX, contactY);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(colors.text);
    pdf.text(`${cv.personalInfo.contact.phone}`, contactX + 80, contactY);
    pdf.setFontSize(10);
    pdf.text('(Phone/Zalo/WhatsApp)', contactX + 80, contactY + this.getLineHeight(11) * 0.8);

    // Add address on new line
    contactY += this.getLineHeight(11) * 2;
    pdf.setFont('Inter', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(colors.primary);
    pdf.text('Address:', contactX, contactY);
    pdf.setFont('Inter', 'normal');
    pdf.setTextColor(colors.text);
    const location = this.formatLocation(cv.personalInfo.location);
    pdf.text(location, contactX + 80, contactY);

    // Add summary section without header
    yPos = Math.max(contactY + this.getLineHeight(11) * 2, this.MARGIN * 6 + 20);

    // Add summary content with adjusted line height
    pdf.setFont('Inter', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(colors.text);

    // Split text into lines with full width
    const summaryText = cv.personalInfo.shortSummary || '';
    const summaryLines = pdf.splitTextToSize(summaryText, this.CONTENT_WIDTH);

    // Calculate line height for summary
    const summaryLineHeight = this.getLineHeight(12) * this.SUMMARY_LINE_HEIGHT;

    // Add each line with custom spacing
    summaryLines.forEach((line: string, index: number) => {
      pdf.text(line, this.MARGIN, yPos + (index * summaryLineHeight));
    });

    // Calculate final yPos after summary
    yPos += (summaryLines.length * summaryLineHeight) + this.SECTION_SPACING;

    // Add Education Section
    yPos = this.addSectionHeader(pdf, 'Education', yPos - this.SECTION_SPACING, colors);

    // Update Education Section
    if (cv.education?.education) {
      cv.education.education.forEach((edu, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 80);

        // Degree and Field
        pdf.setFont('Inter', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(colors.primary);
        pdf.text(`${edu.degree} in ${edu.field}`, this.MARGIN, yPos);

        // Institution and Duration with light blue color
        yPos += this.getLineHeight(14);
        pdf.setFont('Inter', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext);
        pdf.text(`${edu.institution} – ${edu.location} (${edu.startDate} - ${edu.endDate})`, this.MARGIN + 15, yPos);
        yPos += this.getLineHeight(13);
        // Add spacing between education items
        yPos += this.SUB_SECTION_SPACING * 0.7;
      });
    }

    // Add Experience Section
    yPos = this.addSectionHeader(pdf, 'Professional Experience', yPos - this.SECTION_SPACING / 2, colors);

    // Update Experience section with adjusted layout
    if (cv.experience?.workExperience) {
      cv.experience.workExperience.forEach((exp, index) => {
        yPos = this.checkPageBreak(pdf, yPos, 100);

        // Company name (left) and Location (right) on the same line
        pdf.setFont('Inter', 'bold');
        pdf.setFontSize(14); // Reduced from 15
        pdf.setTextColor(colors.primary);
        pdf.text(exp.company, this.CONTENT_LEFT_MARGIN, yPos);

        // Add location (right-aligned)
        pdf.setFont('Inter', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.subtext);
        const locationText = exp.location;
        const locationWidth = pdf.getTextWidth(locationText);
        pdf.text(locationText, this.A4_WIDTH - this.MARGIN - locationWidth, yPos);

        // Position (left) and date (right) on next line
        yPos += this.getLineHeight(14) * 0.8;

        // Add position (left)
        pdf.setFont('Inter', 'medium');
        pdf.setFontSize(13);
        pdf.setTextColor(colors.text);
        const position = exp.position;
        pdf.text(position, this.CONTENT_LEFT_MARGIN, yPos);

        // Add date (right-aligned) with smaller font
        pdf.setFont('Inter', 'normal');
        pdf.setFontSize(11); // Smaller than location
        pdf.setTextColor(colors.subtext);
        const dateText = `${exp.startDate} - ${exp.endDate || 'Present'}`;
        const dateWidth = pdf.getTextWidth(dateText);
        pdf.text(dateText, this.A4_WIDTH - this.MARGIN - dateWidth, yPos);

        // Add responsibilities
        if (exp.responsibilities?.length) {
          yPos += this.getLineHeight(13);
          exp.responsibilities.forEach(responsibility => {
            if (responsibility) {
              yPos = this.checkPageBreak(pdf, yPos, 30);
              pdf.setFont('Inter', 'normal');
              pdf.setFontSize(11);
              pdf.setTextColor(colors.text);

              // Add bullet point
              pdf.setFont('Inter', 'bold');
              pdf.text('•', this.CONTENT_LEFT_MARGIN + this.BULLET_INDENT, yPos);

              // Add responsibility text
              pdf.setFont('Inter', 'normal');
              const responsibilityLines = pdf.splitTextToSize(responsibility, this.CONTENT_WIDTH - this.CONTENT_LEFT_MARGIN - this.TEXT_INDENT);
              pdf.text(responsibilityLines, this.CONTENT_LEFT_MARGIN + this.TEXT_INDENT, yPos);
              yPos += responsibilityLines.length * this.getLineHeight(11);
            }
          });
        }

        yPos += this.SUB_SECTION_SPACING;
      });
    }

    // Update Skills section with better formatting
    if (cv.skills?.technicalSkills) {
      yPos = this.addSectionHeader(pdf, 'Skills', yPos, colors);
      yPos += this.getLineHeight(18) * 0.5;

      const columnWidth = (this.CONTENT_WIDTH) / 3; // Changed from 2 to 3 columns
      let column1Y = yPos;
      let column2Y = yPos;
      let column3Y = yPos;
      let currentColumn = 0; // 0, 1, or 2 for three columns

      Object.entries(cv.skills.technicalSkills).forEach(([category, skills]) => {
        if (Array.isArray(skills) && skills.length > 0) {
          let currentY;
          let x;

          switch(currentColumn) {
            case 0:
              currentY = column1Y;
              x = this.MARGIN;
              break;
            case 1:
              currentY = column2Y;
              x = this.MARGIN + columnWidth + 10;
              break;
            default:
              currentY = column3Y;
              x = this.MARGIN + (columnWidth * 2) + 20;
              break;
          }

          // Category name as header
          pdf.setFont('Inter', 'bold');
          pdf.setFontSize(12); // Reduced from 14 to 12
          pdf.setTextColor(colors.primary);
          const formattedCategory = this.translateService.instant('SKILLS.CATEGORIES.' + category);
          pdf.text(formattedCategory, x, currentY);

          // Skills with bullet points
          pdf.setFont('Inter', 'normal');
          pdf.setFontSize(10); // Reduced from 12 to 10
          pdf.setTextColor(colors.text);

          let skillY = currentY + this.getLineHeight(12);
          skills.forEach(skill => {
            const bulletPoint = '•';
            pdf.text(bulletPoint, x, skillY);
            const translatedSkill = this.translateService.instant(skill);
            pdf.text(translatedSkill, x + 10, skillY); // Reduced indent from 15 to 10
            skillY += this.getLineHeight(10);
          });

          const heightUsed = skillY - currentY + this.getLineHeight(10) * 0.5;
          switch(currentColumn) {
            case 0:
              column1Y += heightUsed;
              break;
            case 1:
              column2Y += heightUsed;
              break;
            case 2:
              column3Y += heightUsed;
              break;
          }

          currentColumn = (currentColumn + 1) % 3;
        }
      });

      yPos = Math.max(column1Y, column2Y, column3Y) + this.SUB_SECTION_SPACING;
    }

    // Add footer with page numbers
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFont('Inter', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(colors.subtext);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        this.A4_WIDTH / 2,
        this.A4_HEIGHT - 20,
        { align: 'center' }
      );
    }

    // Save the PDF with the dynamic filename
    pdf.save(this.getFormattedFileName());
  }

  private formatCategory(category: string): string {
    return this.translateService.instant(category);
  }
}
