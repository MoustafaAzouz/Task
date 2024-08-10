import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorderBottom]',
  standalone: true
})
export class BorderBottomDirective {
  private hoverBackgroundColor: string = 'rgba(128, 128, 128, 0.1)'; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setStyles( this.hoverBackgroundColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setStyles(null);
  }

  private setStyles( backgroundColor: string | null) {
  

    if (backgroundColor) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', backgroundColor);
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
    }
  }
}
