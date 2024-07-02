import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TrackByFunction,
} from '@angular/core';
import { IKeyValuePair } from '@core/interfaces';
import { trackByFnById } from '@core/utils/functions';

@Component({
  selector: 'app-count-dropdown',
  templateUrl: './count-dropdown.component.html',
  styleUrls: ['./count-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountDropdownComponent {
  @Input() count: number;
  @Input() headerName: string;
  @Input() data: IKeyValuePair<string>[] = [];

  public trackByFn: TrackByFunction<IKeyValuePair> = trackByFnById;

  public isMenuOpen = false;

  public handleOpenMenu(event: boolean): void {
    this.isMenuOpen = event;
  }
}
