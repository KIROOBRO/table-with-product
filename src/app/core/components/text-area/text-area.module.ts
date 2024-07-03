import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TextAreaComponent } from './text-area.component';

@NgModule({
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TextAreaModule {}
