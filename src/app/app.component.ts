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
  private refreshScrollTriggersAfterNavigation(): void {
    if (typeof window === 'undefined') return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.scrollAnim.refresh();
      });
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
