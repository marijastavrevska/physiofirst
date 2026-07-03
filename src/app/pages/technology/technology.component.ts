import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

interface TechBlock {
  icon: string;
  name: string;
  description: string;
  benefits: string[];
}

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('block') blockRefs!: QueryList<ElementRef>;

  readonly blocks: TechBlock[] = [
    {
      icon: 'scan',
      name: 'Дигитална Биомеханичка Анализа',
      description:
        'Со употреба на паметни уреди и дигитални алатки, вршиме детална анализа на вашето движење и постура. Оваа анализа ни овозможува да го идентификуваме коренот на проблемот, а не само симптомите. Резултатите се основа за целиот ваш рехабилитациски план.',
      benefits: [
        'Прецизна дијагностика на движењето',
        'Персонализиран план на третман',
        'Мерливи резултати и напредок',
        'Базирано на докази и технологија',
      ],
    },
    {
      icon: 'wave',
      name: 'Tecar Терапија',
      description:
        'Tecar терапијата користи радиофреквентна енергија за длабоко загревање на ткивото, забрзувајќи го природниот процес на закрепнување. Особено ефикасна за мускулни и зглобни проблеми, тендинитиси и хронични болки. Топлината продира длабоко без непријатност на површината.',
      benefits: [
        'Забрзано закрепнување на ткивото',
        'Намалување на воспаление',
        'Ефикасна за хронични состојби',
        'Неинвазивна и безболна',
      ],
    },
    {
      icon: 'pulse',
      name: 'Shockwave Терапија',
      description:
        'Shockwave терапијата применува акустични бранови со висок интензитет на болните точки, стимулирајќи го природното закрепнување и разградувајќи ги калцификациите. Идеална за хронични тетивни проблеми и trigger point болка. Резултатите се забележуваат по само неколку третмани.',
      benefits: [
        'Ефикасна за хронична болка',
        'Разградување на калцификации',
        'Стимулација на природно закрепнување',
        'Кратко времетраење на третман',
      ],
    },
    {
      icon: 'wind',
      name: 'Компресивни Чорапи',
      description:
        'Компресивните чорапи обезбедуваат контролиран притисок кој ја подобрува циркулацијата и го забрзува отстранувањето на метаболички отпадни продукти. Особено корисни за спортисти по интензивни тренинзи и за пациенти со лимфедем. Релаксацијата е брза и длабока.',
      benefits: [
        'Подобрена лимфна дренажа',
        'Побрзо закрепнување по спорт',
        'Намалување на оток',
        'Релаксација на уморни мускули',
      ],
    },
    {
      icon: 'zap',
      name: 'Електростимулациска Игла',
      description:
        'Комбинација на традиционалното акупунктурно иглење со електрична стимулација за прецизна активација на мускулите и нервните патишта. Особено ефикасна за невролошки состојби и длабоки мускулни напнатости. Третманот е контролиран и прецизен.',
      benefits: [
        'Прецизна невромускулна стимулација',
        'Ефикасна за невролошки состојби',
        'Длабоко ослободување на напнатости',
        'Комбиниран ефект на иглење и електростимулација',
      ],
    },
  ];

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    this.blockRefs.forEach((ref, i) => {
      const direction = i % 2 === 0 ? 'left' : 'right';
      this.scrollAnim.slideIn(ref.nativeElement, direction);
    });
  }

  ngOnDestroy(): void {
    this.scrollAnim.killAll();
  }
}
