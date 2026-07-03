import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
  constructor() {
    if (!registered && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
  }

  /** Fade + rise elements into view, staggered, triggered on scroll. */
  staggerFadeUp(targets: string | Element | Element[] | NodeListOf<Element>, options: { trigger?: Element; stagger?: number; y?: number; delay?: number } = {}): void {
    if (typeof window === 'undefined') return;
    gsap.fromTo(
      targets,
      { opacity: 0, y: options.y ?? 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: options.stagger ?? 0.15,
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: (options.trigger as Element) ?? (targets as Element),
          start: 'top 85%',
        },
      }
    );
  }

  /** Slide in from a horizontal direction on scroll. */
  slideIn(target: Element, direction: 'left' | 'right', options: { delay?: number } = {}): void {
    if (typeof window === 'undefined') return;
    const x = direction === 'left' ? -60 : 60;
    gsap.fromTo(
      target,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: target,
          start: 'top 80%',
        },
      }
    );
  }

  /** Scale + fade in on scroll (used for CTA banners). */
  scaleIn(target: Element): void {
    if (typeof window === 'undefined') return;
    gsap.fromTo(
      target,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
        },
      }
    );
  }

  /** Alias for staggerFadeUp, matching design-doc naming. */
  animateFadeUp(targets: string | Element | Element[] | NodeListOf<Element>, stagger = 0.15, trigger?: Element): void {
    this.staggerFadeUp(targets, { stagger, trigger });
  }

  animateFromLeft(target: Element, delay = 0): void {
    this.slideIn(target, 'left', { delay });
  }

  animateFromRight(target: Element, delay = 0): void {
    this.slideIn(target, 'right', { delay });
  }

  /** Draws an SVG line's stroke as it enters the viewport (used for process flows). */
  drawLine(target: SVGPathElement | Element, options: { scrub?: boolean } = {}): void {
    if (typeof window === 'undefined') return;
    const path = target as SVGPathElement;
    const length = path.getTotalLength ? path.getTotalLength() : 1000;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: options.scrub ? undefined : 1.2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: path,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: options.scrub ?? true,
      },
    });
  }

  /** Counts a number up from 0 to target when the element scrolls into view. */
  animateCounter(target: Element, targetValue: number, options: { suffix?: string; duration?: number } = {}): void {
    if (typeof window === 'undefined') return;
    const counter = { value: 0 };
    gsap.to(counter, {
      value: targetValue,
      duration: options.duration ?? 1.6,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        (target as HTMLElement).textContent = `${Math.round(counter.value)}${options.suffix ?? ''}`;
      },
    });
  }

  refresh(): void {
    if (typeof window === 'undefined') return;
    ScrollTrigger.refresh();
  }

  killAll(): void {
    if (typeof window === 'undefined') return;
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
