import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DatePickerModule } from '@core/components/date-picker/date-picker.module';
import { TextAreaModule } from '@core/components/text-area/text-area.module';
import { TextInputModule } from '@core/components/text-input/text-input.module';
import { ControlConverterModule } from '@core/pipes/control-converter/control-converter.module';

import { AddEditProductModalComponent } from './add-edit-product-modal.component';

@NgModule({
  declarations: [AddEditProductModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    ControlConverterModule,
    MatCheckboxModule,
    TextInputModule,
    TextAreaModule,
    DatePickerModule
  ]
})
export class AddEditProductModalModule {}
