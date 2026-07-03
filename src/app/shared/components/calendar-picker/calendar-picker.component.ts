import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';

interface CalendarDay {
  date: Date;
  inCurrentMonth: boolean;
  disabled: boolean;
  isToday: boolean;
  isSelected: boolean;
}

const MONTH_NAMES = [
  'Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
  'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември',
];

const WEEKDAY_LABELS = ['Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб', 'Нед'];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

@Component({
  selector: 'app-calendar-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-picker.component.html',
  styleUrl: './calendar-picker.component.scss',
})
export class CalendarPickerComponent {
  @Input() set selected(value: Date | null) {
    this.selectedDate.set(value ? startOfDay(value) : null);
  }
  @Output() dateSelected = new EventEmitter<Date>();

  readonly weekdayLabels = WEEKDAY_LABELS;
  readonly today = startOfDay(new Date());

  private readonly viewDate = signal(startOfDay(new Date()));
  readonly selectedDate = signal<Date | null>(null);

  readonly monthLabel = computed(() => {
    const d = this.viewDate();
    return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  });

  readonly weeks = computed<CalendarDay[][]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    // Monday = 0 ... Sunday = 6
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - firstWeekday);

    const days: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      const isSunday = date.getDay() === 0;
      const isPast = date.getTime() < this.today.getTime();
      days.push({
        date,
        inCurrentMonth: date.getMonth() === month,
        disabled: isPast || isSunday,
        isToday: date.getTime() === this.today.getTime(),
        isSelected: !!this.selectedDate() && date.getTime() === this.selectedDate()!.getTime(),
      });
    }

    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(days.slice(i * 7, i * 7 + 7));
    }
    return weeks;
  });

  prevMonth(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const d = this.viewDate();
    this.viewDate.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  selectDay(day: CalendarDay): void {
    if (day.disabled) return;
    this.selectedDate.set(day.date);
    this.dateSelected.emit(day.date);
  }
}
