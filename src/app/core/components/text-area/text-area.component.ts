import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() textLabel: string;
  @Input() placeholderText: string;
  @Input() maxLetters = 500;
  @Input() textAreaFormControl: FormControl = new FormControl('');
}
