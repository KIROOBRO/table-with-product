import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination-count',
  templateUrl: './pagination-count.component.html',
  styleUrls: ['./pagination-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationCountComponent {
  @Input() options: number[];
  @Input() selectedCount: number;

  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  public isMenuActive = false;

  public handleOpenMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  public handleSelectCount(item: number): void {
    this.selectedCount = item;
    this.countChange.emit(item);
  }
}
