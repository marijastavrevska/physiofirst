import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScrollAnimationService } from '../../../../core/services/scroll-animation.service';

interface Usp {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-usp-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usp-strip.component.html',
  styleUrl: './usp-strip.component.scss',
})
export class UspStripComponent implements AfterViewInit {
  @ViewChild('grid') gridRef!: ElementRef;

  readonly usps: Usp[] = [
    {
      icon: 'user',
      title: '1-на-1 Секогаш',
      description: 'Целосна посветеност — никогаш не делите термин со друг пациент.',
    },
    {
      icon: 'scan',
      title: 'Дигитална Биомеханичка Анализа',
      description: 'Паметни уреди за проценка на движењето базирана на податоци.',
    },
    {
      icon: 'chip',
      title: 'Напредна Технологија',
      description: 'Пет најсовремени методи за третман под еден покрив.',
    },
    {
      icon: 'clock',
      title: 'Без Чекање',
      description: 'Вашето време е важно — сесијата почнува точно на закажаниот термин.',
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    const cards = this.gridRef.nativeElement.querySelectorAll('.usp-card');
    this.scrollAnim.staggerFadeUp(cards, { trigger: this.gridRef.nativeElement, stagger: 0.15 });
  }
}
