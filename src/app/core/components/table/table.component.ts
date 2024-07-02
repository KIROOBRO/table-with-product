import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { PaginatedResponseModel, TableHeaderModel } from '@core/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnChanges {
  @Input() isShowPagination = true;
  @Input() tableHeaders: TableHeaderModel[];
  @Input() tableData: PaginatedResponseModel<T>;
  @Input() cellTemplateRef: TemplateRef<HTMLElement>;
  @Input() currentCount = 6;
  @Input() currentPage = 1;
  @Input() countOptions: number[];

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeCount: EventEmitter<number> = new EventEmitter<number>();

  public context: TableComponent<T>;

  constructor(private cdr: ChangeDetectorRef) {
    this.context = this;
  }

  @Input() trackByFn: TrackByFunction<T> = () => {};

  public ngOnChanges(): void {
    if (this.tableData && this.currentCount) {
      if (this.tableData.count <= this.currentCount) {
        this.currentPage = 1;
      }
    }
  }

  public handlePageChange(event: number): void {
    this.changePage.emit(event);
  }

  public handleCountChange(event: number): void {
    this.changeCount.emit(event);
  }
}
