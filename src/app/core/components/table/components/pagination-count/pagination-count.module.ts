import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { EpIconModule } from '../../../../../../ep-icons/ep-icon.module';

import { PaginationCountComponent } from './pagination-count.component';

@NgModule({
  declarations: [PaginationCountComponent],
  exports: [PaginationCountComponent],
  imports: [
    CommonModule,
    EpIconModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class PaginationCountModule {}
