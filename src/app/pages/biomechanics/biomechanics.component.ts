import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Explainer {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-biomechanics',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './biomechanics.component.html',
  styleUrl: './biomechanics.component.scss',
})
export class BiomechanicsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('processLine') processLineRef!: ElementRef<SVGPathElement>;
  @ViewChildren('statValue') statValueRefs!: QueryList<ElementRef>;
  @ViewChild('explainerGrid') explainerGridRef!: ElementRef;

  readonly steps: ProcessStep[] = [
    { number: '01', title: 'Почетна Проценка', description: 'Детален разговор за вашата состојба и цели' },
    { number: '02', title: 'Биомеханичка Анализа', description: 'Дигитално снимање и анализа на вашето движење' },
    { number: '03', title: 'Персонализиран Протокол', description: 'Изработка на план специјално за вас' },
    { number: '04', title: 'Мониторирано Закрепнување', description: 'Следење на напредокот и прилагодување на планот' },
  ];

  readonly stats: Stat[] = [
    { value: 100, suffix: '+', label: 'пациенти' },
    { value: 6, suffix: '', label: 'напредни технологии' },
    { value: 1, suffix: '-на-1', label: 'секогаш' },
    { value: 0, suffix: '', label: 'чекалници' },
  ];

  readonly explainers: Explainer[] = [
    {
      icon: 'move',
      title: 'Анализа на Движење',
      text: 'Снимање и процена на тоа како се движи вашето тело.',
    },
    {
      icon: 'target',
      title: 'Откривање на Причината',
      text: 'Наоѓање на коренот на проблемот, не само симптомите.',
    },
    {
      icon: 'brain',
      title: 'Паметен План',
      text: 'Протокол базиран на вашите единствени биомеханички карактеристики.',
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    if (this.processLineRef) {
      this.scrollAnim.drawLine(this.processLineRef.nativeElement, { scrub: true });
    }

    this.statValueRefs.forEach((ref, i) => {
      const stat = this.stats[i];
      this.scrollAnim.animateCounter(ref.nativeElement, stat.value, { suffix: stat.suffix });
    });

    const explainerCards = this.explainerGridRef.nativeElement.querySelectorAll('.explainer-card');
    this.scrollAnim.animateFadeUp(explainerCards, 0.15);
  }

  ngOnDestroy(): void {
    this.scrollAnim.killAll();
  }
}
