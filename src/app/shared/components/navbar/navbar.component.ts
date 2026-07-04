import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ClickOutsideDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  scrolled = false;
  menuOpen = false;

  readonly links: NavLink[] = [
    { label: 'Дома', path: '/' },
    { label: 'Технологија', path: '/technology' },
    { label: 'Услуги', path: '/services' },
    { label: 'Биомеханика', path: '/biomechanics' },
    { label: 'За Нас', path: '/about' },
  ];

  private routerSub;

  constructor(private router: Router) {
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => (this.menuOpen = false));
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = (typeof window !== 'undefined' ? window.scrollY : 0) > 80;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
