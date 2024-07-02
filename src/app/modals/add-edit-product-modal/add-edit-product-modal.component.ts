import { Component, Inject, OnInit, Self } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats
} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { EProductFormKeys } from '@core/enums/e-product-form-keys';
import { IField, IProduct } from '@core/interfaces';
import { NgOnDestroy } from '@core/services';
import * as moment from 'moment';
import { distinctUntilChanged, takeUntil } from 'rxjs';

import { MOK_EXPIRATION_TYPES } from '../../constants/mok-expirations';

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
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss'],
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
export class AddEditProductModalComponent implements OnInit {
  public formGroup: FormGroup;

  public EProductFormKeys = EProductFormKeys;
  public MOK_EXPIRATION_TYPES = MOK_EXPIRATION_TYPES;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: IProduct,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    @Self() private readonly ngOnDestroy$: NgOnDestroy,
    private dialogRef: MatDialogRef<AddEditProductModalComponent>,
    private fb: FormBuilder
  ) {
    dateFormats.display.dateInput = 'DD.MM.YYYY';
  }

  public get getHeaderName(): string {
    return this.data?.id ? 'Edit product' : 'Add product';
  }

  public get fieldsFormArray(): FormArray {
    return this.formGroup.get(EProductFormKeys.FIELDS) as FormArray;
  }

  ngOnInit(): void {
    this.dialogRef.addPanelClass('add-edit-product-modal');
    this.initFormGroup(this.data);
    this.startDateControlsWatching();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public handleSubmit(): void {
    this.dialogRef.close({ ...this.formGroup.getRawValue(), category_id: 1 });
  }

  public addField(): void {
    this.fieldsFormArray.push(this.addNewFieldGroup());
  }

  public deleteField(field: AbstractControl, idx: number): void {
    if (this.fieldsFormArray.length > 1) {
      this.fieldsFormArray.removeAt(idx);
    } else {
      field.get('name')?.reset('');
      field.get('value')?.reset('');
      field.get('is_date')?.reset('');
    }
  }

  public handleClearFieldValue(field: AbstractControl): void {
    field.get('value')?.reset('');
  }

  public handleChangeFieldDateValue(field: AbstractControl): void {
    field
      .get('value')
      ?.setValue(moment(field.get('value')?.value).format('YYYY-MM-DD'));
  }

  private initFormGroup(product: IProduct): void {
    this.formGroup = this.fb.group({
      [EProductFormKeys.ID]: [product?.id || null],
      [EProductFormKeys.NAME]: [product?.name || null, [Validators.required]],
      [EProductFormKeys.EXPIRATION_TYPE]: [
        product?.expiration_type || null,
        [Validators.required]
      ],
      [EProductFormKeys.MANUFACTURE_DATE]: [
        product?.manufacture_date || null,
        [Validators.required]
      ],
      [EProductFormKeys.EXPIRATION_DATE]: [product?.expiration_date || null],
      [EProductFormKeys.COMMENT]: [product?.comment || null],
      [EProductFormKeys.FIELDS]: product?.fields?.length
        ? this.initFieldsFormArray(product.fields)
        : this.fb.array([this.addNewFieldGroup()])
    });
  }

  private initFieldsFormArray(fields: IField[]): FormArray {
    return this.fb.array(
      fields.map((el) =>
        el.name && el.value && el.is_date
          ? this.addNewFieldGroup(el.name, el.value, el.is_date)
          : this.addNewFieldGroup()
      )
    );
  }

  private addNewFieldGroup(
    name = '',
    value: Date | string = '',
    is_date = false
  ): FormGroup {
    return this.fb.group({
      name: [name, [Validators.required]],
      value: [value, [Validators.required]],
      is_date: [is_date]
    });
  }

  private startDateControlsWatching(): void {
    this.formGroup
      .get(EProductFormKeys.EXPIRATION_DATE)
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.ngOnDestroy$))
      .subscribe((value) =>
        this.formGroup
          .get(EProductFormKeys.EXPIRATION_DATE)
          ?.setValue(moment(value).format('YYYY-MM-DD'))
      );

    this.formGroup
      .get(EProductFormKeys.MANUFACTURE_DATE)
      ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.ngOnDestroy$))
      .subscribe((value) =>
        this.formGroup
          .get(EProductFormKeys.MANUFACTURE_DATE)
          ?.setValue(moment(value).format('YYYY-MM-DD'))
      );
  }
}
