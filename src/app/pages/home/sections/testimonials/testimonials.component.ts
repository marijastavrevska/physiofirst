import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollAnimationService } from '../../../../core/services/scroll-animation.service';

interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('grid') gridRef!: ElementRef;

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'По само неколку третмани, болката во грбот целосно исчезна. Професионален пристап и врвна технологија.',
      name: 'Марија К.',
      treatment: 'Спинална Рехабилитација',
    },
    {
      quote:
        'Биомеханичката анализа ми го откри коренот на проблемот. Препорачувам на секој спортист.',
      name: 'Александар Т.',
      treatment: 'Спортска Рехабилитација',
    },
    {
      quote:
        'Единствено место во Битола каде се чувствувате дека сте единствениот пациент. Извонредно.',
      name: 'Елена М.',
      treatment: 'Tecar Терапија',
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    const cards = this.gridRef.nativeElement.querySelectorAll('.testimonial-card');
    this.scrollAnim.staggerFadeUp(cards, { trigger: this.gridRef.nativeElement, stagger: 0.15 });
  }
}
