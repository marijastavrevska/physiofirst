import { Component, ElementRef, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import gsap from 'gsap';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ScrollAnimationService } from './core/services/scroll-animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private routerSub;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private scrollAnim: ScrollAnimationService
  ) {
    // The browser's own native scroll restoration for pushState-based
    // navigation fights with Angular's scroll-to-top and can leave the
    // page scrolled to wherever the previous route happened to be
    // (clamped to the new page's height) instead of the top. Disabling
    // it hands scroll control entirely to Angular/our own logic below.
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.refreshScrollTriggersAfterNavigation());
  }

  onRouteActivate(): void {
    const main = this.elementRef.nativeElement.querySelector('.app-main');
    if (main && typeof window !== 'undefined') {
      gsap.fromTo(main, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }

  // Angular's scroll-to-top restoration is scheduled asynchronously after
  // NavigationEnd (raced against a render tick internally), so a single
  // rAF isn't a reliable enough margin — two frames guarantees we recompute
  // ScrollTrigger positions after that reset has actually taken effect.
  // ScrollTrigger.refresh() itself records whatever the current scroll
  // position is and restores it afterward, so we force scrollTo(0,0)
  // ourselves right before calling it — otherwise it can race Angular's
  // own reset and end up capturing (and re-applying) the previous page's
  // stale scroll offset instead of the top.
  private refreshScrollTriggersAfterNavigation(): void {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        this.scrollAnim.refresh();
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
