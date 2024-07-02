import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

// import { PaginationCountModule } from './components/pagination-count/pagination-count.module';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
    // PaginationCountModule
  ],
  exports: [TableComponent]
})
export class TableModule {}
