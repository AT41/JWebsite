import { Directive, HostListener, Input } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

/**
 * This allows users to select highlighted option in the angular dropdown by pressing tab.
 * You may want to enable autoActiveFirstOption on the dropdown itself.
 */

@Directive({
  selector: '[appDropdownTab]'
})
export class DropdownTabDirective {
  @Input() dropDownDirectiveFormControl: FormControl;

  constructor(private matAutocomplete: MatAutocompleteTrigger) {}
  @HostListener('keydown.tab', ['$event.target']) onBlur() {
    if (this.matAutocomplete.activeOption) {
      this.dropDownDirectiveFormControl.setValue(this.matAutocomplete.activeOption.value);
    }
  }
}
