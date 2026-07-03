import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ScrollAnimationService } from '../../core/services/scroll-animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('certGrid') certGridRef!: ElementRef;
  @ViewChild('gallery') galleryRef!: ElementRef;

  readonly certifications = [
    'Ергон Техника',
    'Мануелна Лимфна Дренажа',
    'Медицинска Акупунктура',
    'Спинални Манипулации (ОМТ)',
    'Хиџама Терапија',
    'Кинезиотејпинг',
  ];

  readonly galleryPlaceholders = Array.from({ length: 6 });

  constructor(private scrollAnim: ScrollAnimationService) {}

  ngAfterViewInit(): void {
    const badges = this.certGridRef.nativeElement.querySelectorAll('.cert-badge');
    this.scrollAnim.animateFadeUp(badges, 0.08);

    const photos = this.galleryRef.nativeElement.querySelectorAll('.gallery-item');
    this.scrollAnim.animateFadeUp(photos, 0.08);
  }

  ngOnDestroy(): void {
    this.scrollAnim.killAll();
  }
}
