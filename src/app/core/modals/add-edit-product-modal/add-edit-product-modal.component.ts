import {
  Component,
  Inject,
  OnInit,
  Self,
  TrackByFunction
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MOK_EXPIRATION_TYPES } from '@core/constants/mok-expirations';
import { EProductFormKeys } from '@core/enums/e-product-form-keys';
import { IExpirationType, IField, IProduct } from '@core/interfaces';
import { NgOnDestroy } from '@core/services';
import { trackByFnById } from '@core/utils/functions';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss'],
  providers: [NgOnDestroy]
})
export class AddEditProductModalComponent implements OnInit {
  public formGroup: FormGroup;

  public MOK_EXPIRATION_TYPES = MOK_EXPIRATION_TYPES;
  public EProductFormKeys = EProductFormKeys;

  public isShowExpirationDate = false;

  public trackByExpirationTypes: TrackByFunction<IExpirationType> =
    trackByFnById;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: IProduct,
    @Self() private readonly ngOnDestroy$: NgOnDestroy,
    private dialogRef: MatDialogRef<AddEditProductModalComponent>,
    private fb: FormBuilder
  ) {}

  public get getHeaderName(): string {
    return this.data?.id ? 'Edit product' : 'Add product';
  }

  public get getSubmitBtnName(): string {
    return this.data?.id ? 'Save product' : 'Add product';
  }

  public get fieldsFormArray(): FormArray {
    return this.formGroup.get(EProductFormKeys.FIELDS) as FormArray;
  }

  public trackByFields: TrackByFunction<AbstractControl> = (idx: number) => idx;

  ngOnInit(): void {
    this.dialogRef.addPanelClass('add-edit-product-modal');
    this.initFormGroup(this.data);
    this.startExpirationTypeWatching();
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
      fields.map((el: IField) =>
        this.addNewFieldGroup(el.name, el.value, el.is_date)
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

  private startExpirationTypeWatching(): void {
    this.isShowExpirationDate =
      this.formGroup.get(EProductFormKeys.EXPIRATION_TYPE)?.value ===
      'expirable';

    this.formGroup
      .get(EProductFormKeys.EXPIRATION_TYPE)
      ?.valueChanges.pipe(takeUntil(this.ngOnDestroy$))
      .subscribe((value) => {
        this.isShowExpirationDate = value === 'expirable';

        if (this.isShowExpirationDate) {
          this.formGroup
            .get(EProductFormKeys.EXPIRATION_DATE)
            ?.setValidators(Validators.required);
        }
      });
  }
}
