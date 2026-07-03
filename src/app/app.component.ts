import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private elementRef: ElementRef) {}

  onRouteActivate(): void {
    const main = this.elementRef.nativeElement.querySelector('.app-main');
    if (main && typeof window !== 'undefined') {
      gsap.fromTo(main, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  }
}
