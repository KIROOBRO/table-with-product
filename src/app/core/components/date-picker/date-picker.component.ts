import { Component, Inject, Input, OnInit, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats
} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { NgOnDestroy } from '@core/services';
import { takeUntil } from 'rxjs';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY'
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    monthLabel: 'MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    NgOnDestroy
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() isRequired = false;
  @Input() textLabel: string;
  @Input() placeholderText: string;
  @Input() dateControl: FormControl = new FormControl(null);

  public formControl: FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    @Self() private readonly ngOnDestroy$: NgOnDestroy
  ) {
    dateFormats.display.dateInput = 'DD.MM.YYYY';
  }

  ngOnInit(): void {
    this.formControl.setValue(this.dateControl.value);

    this.startFormControlWatching();
  }

  public dateChanged(date: MatDatepickerInputEvent<any>): void {
    this.dateControl.setValue(date.value?.format('YYYY-MM-DD'));
    this.dateControl.markAsDirty();
  }

  private startFormControlWatching(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((value) => {
        this.dateControl.setValue(value);
      });
  }
}
