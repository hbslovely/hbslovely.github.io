# Iframe Reload Issue Fix

## Problem
Using `[src]="getIframeSrc()"` in Angular templates causes iframes to reload on every change detection cycle because Angular treats method calls as potentially changing values.

## Solution
Use **property binding** instead of **method calls** for iframe sources.

## Implementation

### ❌ Wrong Way (Causes Reload)
```typescript
// Component
getIframeSrc() {
  const url = this.currentUrl.toLowerCase();
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
```

```html
<!-- Template -->
<iframe [src]="getIframeSrc()"></iframe>
```

### ✅ Correct Way (No Reload)
```typescript
// Component
export class YourComponent {
  currentUrl: string = '';
  iframeSrc: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  updateIframeSrc(url: string) {
    if (this.currentUrl !== url) {
      this.currentUrl = url;
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url.toLowerCase());
    }
  }
}
```

```html
<!-- Template -->
<iframe [src]="iframeSrc" *ngIf="iframeSrc"></iframe>
```

## Complete IframeEmbedComponent

I've created a reusable `IframeEmbedComponent` that handles:

1. **URL Processing**: Automatically converts YouTube, Vimeo, Google Maps URLs to embeddable format
2. **Security**: Uses Angular's DomSanitizer for safe URL handling
3. **Performance**: Only updates when URL actually changes
4. **Error Handling**: Shows fallback UI for invalid URLs
5. **Responsive Design**: Adapts to different screen sizes

### Usage Examples

```html
<!-- YouTube Video -->
<app-iframe-embed 
  [url]="'https://www.youtube.com/watch?v=dQw4w9WgXcQ'"
  [height]="'315px'"
  [title]="'YouTube Video'">
</app-iframe-embed>

<!-- Booking Widget -->
<app-iframe-embed 
  [url]="bookingWidgetUrl"
  [height]="'400px'"
  [title]="'Booking Widget'">
</app-iframe-embed>

<!-- Google Maps -->
<app-iframe-embed 
  [url]="'https://www.google.com/maps/@10.7769,106.7009,15z'"
  [height]="'300px'"
  [title]="'Location Map'">
</app-iframe-embed>
```

## Key Benefits

1. **No Reload Issues**: Iframe only reloads when URL actually changes
2. **Better Performance**: Avoids unnecessary change detection cycles
3. **Reusable**: Can be used across different components
4. **Type Safe**: Proper TypeScript typing with SafeResourceUrl
5. **Error Handling**: Graceful fallback for invalid URLs
6. **Accessibility**: Proper title and loading attributes

## Alternative Solutions

### 1. OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 2. TrackBy Function (for ngFor)
```typescript
trackByUrl(index: number, item: any): string {
  return item.url;
}
```

### 3. Memoization
```typescript
private iframeSrcCache = new Map<string, SafeResourceUrl>();

getIframeSrc(url: string): SafeResourceUrl {
  if (!this.iframeSrcCache.has(url)) {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.toLowerCase());
    this.iframeSrcCache.set(url, sanitizedUrl);
  }
  return this.iframeSrcCache.get(url)!;
}
```

## Files Created

1. `src/app/shared/components/iframe-embed/iframe-embed.component.ts`
2. `src/app/shared/components/iframe-embed/iframe-embed.component.html`
3. `src/app/shared/components/iframe-embed/iframe-embed.component.scss`
4. `src/app/shared/components/iframe-embed/iframe-embed-usage-examples.html`

The component is now integrated into the venue detail component as an example of proper usage.
