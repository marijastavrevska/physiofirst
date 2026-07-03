import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface BodyArea {
  key: string;
  label: string;
}

interface Recommendation {
  service: string;
  description: string;
}

@Component({
  selector: 'app-symptom-mapper',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './symptom-mapper.component.html',
  styleUrl: './symptom-mapper.component.scss',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, height: 0, transform: 'translateY(-16px)' }),
        animate(
          '300ms ease',
          style({ opacity: 1, height: '*', transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease',
          style({ opacity: 0, height: 0, transform: 'translateY(-16px)' })
        ),
      ]),
    ]),
  ],
})
export class SymptomMapperComponent {
  readonly bodyAreas: BodyArea[] = [
    { key: 'lowerBack', label: 'Долен Грб' },
    { key: 'neckShoulders', label: 'Врат и Раменици' },
    { key: 'knee', label: 'Колено' },
    { key: 'hip', label: 'Колк' },
    { key: 'elbow', label: 'Лакт' },
    { key: 'wrist', label: 'Зглоб' },
    { key: 'ankle', label: 'Глуждови' },
    { key: 'headPosture', label: 'Глава и Постура' },
    { key: 'fullBody', label: 'Целосно Закрепнување' },
    { key: 'neurological', label: 'Невролошко' },
  ];

  readonly recommendations: Record<string, Recommendation> = {
    lowerBack: {
      service: 'Спинална Манипулација + Електростимулација',
      description:
        'Хиропрактичниот третман во комбинација со електростимулација ги ослободува напнатите мускули и ја враќа подвижноста.',
    },
    neckShoulders: {
      service: 'Ергон ИАСТМ Техника + Dry Needling',
      description:
        'Специјализирана техника за миофасцијално ослободување на вратот и рамениците.',
    },
    knee: {
      service: 'Shockwave Терапија + Спортска Рехабилитација',
      description:
        'Shockwave терапијата го стимулира природното закрепнување на ткивото кај хронични болки во коленото.',
    },
    hip: {
      service: 'Tecar Терапија + Биомеханичка Проценка',
      description:
        'Длабока термална терапија за забрзано закрепнување на колкот со прецизна биомеханичка анализа.',
    },
    elbow: {
      service: 'Ергон ИАСТМ (Тениски/Голф Лакт) + Електроакупунктура',
      description:
        'Ергон техниката е особено ефикасна за тениски и голф лакт — прецизно и брзо.',
    },
    wrist: {
      service: 'Ергон ИАСТМ + Електростимулација',
      description:
        'Мануелна техника за ослободување на зглобот во комбинација со електрична стимулација.',
    },
    ankle: {
      service: 'Компресивни Чорапи + Спортска Рехабилитација',
      description:
        'Лимфна дренажа и спортска рехабилитација за брзо закрепнување на глуждовите.',
    },
    headPosture: {
      service: 'Дигитална Биомеханичка Анализа + Корекција на Постура',
      description:
        'Објективна анализа на движењето и постурата со персонализиран програм за корекција.',
    },
    fullBody: {
      service: 'Компресивни Чорапи + Медицинска Масажа + Tecar Терапија',
      description:
        'Комплетен протокол за закрепнување — лимфна дренажа, релаксација и длабока термална терапија.',
    },
    neurological: {
      service: 'Електроакупунктура + Невролошка Рехабилитација',
      description:
        'Специјализиран невролошки рехабилитациски програм со електроакупунктура за прецизна стимулација.',
    },
  };

  selected: string | null = null;

  select(key: string): void {
    this.selected = this.selected === key ? null : key;
  }

  get selectedLabel(): string {
    return this.bodyAreas.find((a) => a.key === this.selected)?.label ?? '';
  }

  get selectedRecommendation(): Recommendation | null {
    return this.selected ? this.recommendations[this.selected] : null;
  }
}
