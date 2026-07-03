import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ScrollAnimationService } from '../../../../core/services/scroll-animation.service';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cta-banner.component.html',
  styleUrl: './cta-banner.component.scss',
})
export class CtaBannerComponent implements AfterViewInit {
  @ViewChild('banner') bannerRef!: ElementRef;

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.scrollAnim.scaleIn(this.bannerRef.nativeElement);
  }
}
