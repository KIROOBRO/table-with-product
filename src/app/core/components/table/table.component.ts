import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  TrackByFunction
} from '@angular/core';
import { TableHeaderModel } from '@core/models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> {
  @Input() tableHeaders: TableHeaderModel[];
  @Input() tableData: T[];
  @Input() cellTemplateRef: TemplateRef<HTMLElement>;

  public context: TableComponent<T>;

  constructor() {
    this.context = this;
  }

  @Input() trackByFn: TrackByFunction<T> = () => {};
}
