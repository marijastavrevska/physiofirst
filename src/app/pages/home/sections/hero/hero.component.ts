import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('overline') overlineRef!: ElementRef;
  @ViewChild('heading') headingRef!: ElementRef;
  @ViewChild('subheadline') subheadlineRef!: ElementRef;
  @ViewChild('actions') actionsRef!: ElementRef;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(this.overlineRef.nativeElement, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(this.headingRef.nativeElement, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(this.subheadlineRef.nativeElement, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(this.actionsRef.nativeElement, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }
}
