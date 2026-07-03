import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationService } from '../../../../core/services/scroll-animation.service';

interface TechCard {
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-tech-teaser',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tech-teaser.component.html',
  styleUrl: './tech-teaser.component.scss',
})
export class TechTeaserComponent implements AfterViewInit {
  @ViewChild('grid') gridRef!: ElementRef;

  readonly cards: TechCard[] = [
    {
      icon: 'scan',
      name: 'Дигитална Биомеханичка Анализа',
      description: 'Проценка на движењето базирана на податоци',
    },
    {
      icon: 'wave',
      name: 'Tecar Терапија',
      description: 'Длабока радиофреквентна терапија за забрзано закрепнување на ткивото',
    },
    {
      icon: 'pulse',
      name: 'Shockwave Терапија',
      description: 'Насочени акустични бранови за хронични точки на болка',
    },
    {
      icon: 'wind',
      name: 'Компресивни Чорапи',
      description: 'Пневматска компресија за лимфна дренажа и закрепнување',
    },
    {
      icon: 'zap',
      name: 'Електростимулациска Игла',
      description: 'Прецизна мускулна активација и терапија против болка',
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    const cards = this.gridRef.nativeElement.querySelectorAll('.tech-card');
    this.scrollAnim.staggerFadeUp(cards, { trigger: this.gridRef.nativeElement, stagger: 0.12, y: 20 });
  }
}
