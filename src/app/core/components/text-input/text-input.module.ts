import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { TextInputComponent } from './text-input.component';

@NgModule({
  declarations: [TextInputComponent],
  exports: [TextInputComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class TextInputModule {}
