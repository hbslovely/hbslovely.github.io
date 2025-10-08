import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iframe-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iframe-embed.component.html',
  styleUrls: ['./iframe-embed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeEmbedComponent implements OnInit, OnChanges {
  @Input() url: string = '';
  @Input() width: string = '100%';
  @Input() height: string = '400px';
  @Input() title: string = 'Embedded Content';
  @Input() loading: 'eager' | 'lazy' = 'lazy';

  // This is the key fix - use a property instead of a method
  safeUrl: SafeResourceUrl | null = null;
  private lastProcessedUrl: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.updateSafeUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url'] && !changes['url'].firstChange) {
      this.updateSafeUrl();
    }
  }

  private updateSafeUrl() {
    // Only update if the URL actually changed
    if (this.url && this.url !== this.lastProcessedUrl) {
      this.lastProcessedUrl = this.url;
      
      // Handle different URL types and provide embeddable alternatives
      const processedUrl = this.processUrl(this.url);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(processedUrl);
    }
  }

  private processUrl(url: string): string {
    const lowerUrl = url.toLowerCase();
    
    // Handle YouTube URLs
    if (lowerUrl.includes('youtube.com/watch') || lowerUrl.includes('youtu.be/')) {
      return this.convertToYouTubeEmbed(url);
    }
    
    // Handle Vimeo URLs
    if (lowerUrl.includes('vimeo.com/')) {
      return this.convertToVimeoEmbed(url);
    }
    
    // Handle Google Maps
    if (lowerUrl.includes('google.com/maps') || lowerUrl.includes('maps.google.com')) {
      return this.convertToGoogleMapsEmbed(url);
    }
    
    // Handle Booking.com widgets
    if (lowerUrl.includes('booking.com')) {
      return this.convertToBookingEmbed(url);
    }
    
    // For other URLs, return as-is (they should already be embeddable)
    return url;
  }

  private convertToYouTubeEmbed(url: string): string {
    const videoId = this.extractYouTubeVideoId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  private convertToVimeoEmbed(url: string): string {
    const videoId = this.extractVimeoVideoId(url);
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  }

  private convertToGoogleMapsEmbed(url: string): string {
    // Extract coordinates or place ID from Google Maps URL
    // This is a simplified version - you might need more complex parsing
    if (url.includes('/@')) {
      return url.replace('/maps/', '/maps/embed/');
    }
    return url;
  }

  private convertToBookingEmbed(url: string): string {
    // Convert booking.com URLs to embeddable format
    // This is a placeholder - actual implementation depends on Booking.com's embed API
    return url;
  }

  private extractYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  private extractVimeoVideoId(url: string): string | null {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  // Method to manually refresh the iframe (useful for dynamic content)
  refreshIframe() {
    if (this.safeUrl) {
      // Force a refresh by temporarily clearing and resetting the URL
      const currentUrl = this.lastProcessedUrl;
      this.lastProcessedUrl = '';
      this.safeUrl = null;
      
      // Use setTimeout to ensure the change detection cycle completes
      setTimeout(() => {
        this.lastProcessedUrl = currentUrl;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.processUrl(currentUrl));
      }, 0);
    }
  }
}
