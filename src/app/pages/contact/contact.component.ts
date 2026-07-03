import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CalendarPickerComponent } from '../../shared/components/calendar-picker/calendar-picker.component';
import { ReservationService } from '../../core/services/reservation.service';
import { NotificationService } from '../../core/services/notification.service';

const PHONE_PATTERN = /^(\+389\s?|0)7\d([\s-]?\d{3}){2}$/;

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarPickerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('400ms ease', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class ContactComponent implements OnDestroy {
  readonly serviceOptions = [
    'Рехабилитација — Акутни и Хронични Состојби',
    'Корекција на Постура',
    'Спортска Рехабилитација',
    'Невролошка Рехабилитација',
    'Биомеханичка Проценка (Премиум)',
    'Не сум сигурен — сакам совет',
  ];

  readonly timeSlots: string[] = Array.from({ length: 15 }, (_, i) => {
    const hour = 7 + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly selectedDate = signal<Date | null>(null);

  readonly form = this.fb.group({
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    email: ['', [Validators.email]],
    serviceType: ['', [Validators.required]],
    preferredDate: ['', [Validators.required]],
    preferredTime: [{ value: '', disabled: true }, [Validators.required]],
    notes: ['', [Validators.maxLength(500)]],
  });

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private notifications: NotificationService
  ) {}

  get notesLength(): number {
    return this.form.get('notes')?.value?.length ?? 0;
  }

  hasError(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!c && c.touched && c.hasError(error);
  }

  onDateSelected(date: Date): void {
    this.selectedDate.set(date);
    this.form.patchValue({ preferredDate: toIsoDate(date), preferredTime: '' });
    this.form.get('preferredTime')?.enable();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const value = this.form.getRawValue();

    this.reservationService
      .submit({
        fullName: value.fullName!,
        phone: value.phone!,
        email: value.email || undefined,
        serviceType: value.serviceType!,
        preferredDate: value.preferredDate!,
        preferredTime: value.preferredTime!,
        notes: value.notes || undefined,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.submitted.set(true);
        },
        error: () => {
          this.submitting.set(false);
          this.notifications.error('Се случи грешка. Обидете се повторно или јавете се.');
        },
      });
  }

  resetForm(): void {
    this.form.reset({
      fullName: '',
      phone: '',
      email: '',
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    });
    this.form.get('preferredTime')?.disable();
    this.selectedDate.set(null);
    this.submitted.set(false);
  }

  ngOnDestroy(): void {}
}
