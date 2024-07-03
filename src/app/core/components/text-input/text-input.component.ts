import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgOnDestroy } from '@core/services';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class TextInputComponent {
  @ViewChild('textInput') textInput: ElementRef;

  @Input() textLabel: string;
  @Input() placeholderText: string;
  @Input() isRequired = false;
  @Input() errorText = '';
  @Input() textFormControl: FormControl = new FormControl(null);
}
