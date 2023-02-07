import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnInit {
  @Input() color: string = 'white';

  constructor(private element: ElementRef, private rendered: Renderer2) {
  }

  ngOnInit(): void {
    this.rendered.setStyle(
      this.element.nativeElement,
      'background-color',
      this.color
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.rendered.setStyle(
      this.element.nativeElement,
      'background-color',
      'yellow'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.rendered.setStyle(
      this.element.nativeElement,
      'background-color',
      this.color
    );
  }
}
