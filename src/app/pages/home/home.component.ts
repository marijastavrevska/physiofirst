import { Component, OnDestroy } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { UspStripComponent } from './sections/usp-strip/usp-strip.component';
import { TechTeaserComponent } from './sections/tech-teaser/tech-teaser.component';
import { SymptomMapperComponent } from './sections/symptom-mapper/symptom-mapper.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { CtaBannerComponent } from './sections/cta-banner/cta-banner.component';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    UspStripComponent,
    TechTeaserComponent,
    SymptomMapperComponent,
    TestimonialsComponent,
    CtaBannerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
  constructor(private scrollAnim: ScrollAnimationService) {}

  ngOnDestroy(): void {
    this.scrollAnim.killAll();
  }
}
