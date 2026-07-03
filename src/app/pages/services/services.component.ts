import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

interface ServiceCategory {
  icon: string;
  name: string;
  audience: string;
  description: string;
  premium?: boolean;
}

interface Package {
  name: string;
  sessions: string;
  description: string;
  popular?: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardsGrid') cardsGridRef!: ElementRef;
  @ViewChild('packagesGrid') packagesGridRef!: ElementRef;

  readonly categories: ServiceCategory[] = [
    {
      icon: 'cross',
      name: 'Рехабилитација',
      audience: 'Акутни и Хронични Состојби',
      description: 'Индивидуализиран пристап кон акутни повреди и хронични мускулно-скелетни проблеми.',
    },
    {
      icon: 'posture',
      name: 'Корекција на Постура',
      audience: 'За ИТ Професионалци и Канцелариски Работници',
      description: 'Постурален менаџмент програм дизајниран за луѓе кои работат долго пред компјутер.',
    },
    {
      icon: 'run',
      name: 'Спортска Рехабилитација и Закрепнување',
      audience: '',
      description: 'Брзо и ефикасно закрепнување за спортисти со протоколи базирани на напредна технологија.',
    },
    {
      icon: 'brain',
      name: 'Невролошка и Постравматска Рехабилитација',
      audience: '',
      description: 'Специјализирани програми за невролошки состојби и постравматско закрепнување.',
    },
    {
      icon: 'scan',
      name: 'Биомеханичка Проценка и Анализа',
      audience: '',
      description: 'Дигитална анализа на движењето — прво во Битола и во Македонија.',
      premium: true,
    },
  ];

  readonly packages: Package[] = [
    {
      name: 'Старт Пакет',
      sessions: '3 сесии',
      description: 'Идеален за почеток и проценка',
    },
    {
      name: 'Пакет за Закрепнување',
      sessions: '6 сесии',
      description: 'Комплетен рехабилитациски протокол',
      popular: true,
    },
    {
      name: 'Премиум Програм',
      sessions: '12 сесии + биомеханичка проценка',
      description: 'Целосна трансформација и мониторинг',
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    const cards = this.cardsGridRef.nativeElement.querySelectorAll('.service-card');
    this.scrollAnim.animateFadeUp(cards, 0.12, this.cardsGridRef.nativeElement);

    const packages = this.packagesGridRef.nativeElement.querySelectorAll('.package-card');
    this.scrollAnim.animateFadeUp(packages, 0.15, this.packagesGridRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.scrollAnim.killAll();
  }
}
