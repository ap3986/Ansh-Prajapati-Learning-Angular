import {Directive, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatTooltipModule} from '@angular/material/tooltip';

@Directive({
  selector: '[appShowDetailsOnHover,matTooltip]',
  standalone: true,
})


export class ShowDetailsOnHoverDirective {
  @Input('matTooltip') message: string = "";
  @Input('matTooltipPosition')  position: 'above';
  constructor() { }

}
