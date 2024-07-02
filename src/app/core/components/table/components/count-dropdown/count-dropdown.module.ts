import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { CountDropdownComponent } from '@core/components/table/components/count-dropdown/count-dropdown.component';

import { EpIconModule } from '../../../../../../ep-icons/ep-icon.module';

@NgModule({
  declarations: [CountDropdownComponent],
  imports: [CommonModule, EpIconModule, MatMenuModule, MatRadioModule],
  exports: [CountDropdownComponent],
})
export class CountDropdownModule {}
