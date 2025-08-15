import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartAnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  animateAddToCart(sourceElement: HTMLElement): void {
    // Find the cart icon
    const targetElement = document.querySelector('.cart-link .pi-shopping-cart') as HTMLElement;
    if (!targetElement) return;

    // Create flying item
    const flyingItem = this.renderer.createElement('div');
    this.renderer.addClass(flyingItem, 'flying-item');

    // Get source position
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Set initial position
    this.renderer.setStyle(flyingItem, 'position', 'fixed');
    this.renderer.setStyle(flyingItem, 'top', `${sourceRect.top}px`);
    this.renderer.setStyle(flyingItem, 'left', `${sourceRect.left}px`);
    this.renderer.setStyle(flyingItem, 'width', '20px');
    this.renderer.setStyle(flyingItem, 'height', '20px');
    this.renderer.setStyle(flyingItem, 'background-color', 'var(--primary-color)');
    this.renderer.setStyle(flyingItem, 'border-radius', '50%');
    this.renderer.setStyle(flyingItem, 'z-index', '9999');
    this.renderer.setStyle(flyingItem, 'pointer-events', 'none');

    // Add to body
    this.renderer.appendChild(document.body, flyingItem);

    // Animate
    requestAnimationFrame(() => {
      this.renderer.setStyle(flyingItem, 'transition', 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
      this.renderer.setStyle(flyingItem, 'top', `${targetRect.top}px`);
      this.renderer.setStyle(flyingItem, 'left', `${targetRect.left}px`);
      this.renderer.setStyle(flyingItem, 'transform', 'scale(0)');
      this.renderer.setStyle(flyingItem, 'opacity', '0');

      // Remove after animation
      setTimeout(() => {
        this.renderer.removeChild(document.body, flyingItem);
      }, 800);
    });
  }
} 