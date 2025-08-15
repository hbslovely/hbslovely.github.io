import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartAnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  animateAddToCart(sourceElement: HTMLElement, targetElement: HTMLElement) {
    // Create flying item
    const flyingItem = this.renderer.createElement('div');
    this.renderer.addClass(flyingItem, 'flying-item');
    this.renderer.appendChild(document.body, flyingItem);

    // Get source and target positions
    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Set initial position
    this.renderer.setStyle(flyingItem, 'position', 'fixed');
    this.renderer.setStyle(flyingItem, 'z-index', '9999');
    this.renderer.setStyle(flyingItem, 'width', '20px');
    this.renderer.setStyle(flyingItem, 'height', '20px');
    this.renderer.setStyle(flyingItem, 'background-color', 'var(--color-primary-500)');
    this.renderer.setStyle(flyingItem, 'border-radius', '50%');
    this.renderer.setStyle(flyingItem, 'left', `${sourceRect.left + sourceRect.width / 2}px`);
    this.renderer.setStyle(flyingItem, 'top', `${sourceRect.top + sourceRect.height / 2}px`);
    this.renderer.setStyle(flyingItem, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(flyingItem, 'pointer-events', 'none');

    // Animate
    requestAnimationFrame(() => {
      this.renderer.setStyle(flyingItem, 'transition', 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
      this.renderer.setStyle(flyingItem, 'left', `${targetRect.left + targetRect.width / 2}px`);
      this.renderer.setStyle(flyingItem, 'top', `${targetRect.top + targetRect.height / 2}px`);
      this.renderer.setStyle(flyingItem, 'transform', 'translate(-50%, -50%) scale(0)');
      this.renderer.setStyle(flyingItem, 'opacity', '0');

      // Remove element after animation
      setTimeout(() => {
        this.renderer.removeChild(document.body, flyingItem);
      }, 800);
    });
  }
} 