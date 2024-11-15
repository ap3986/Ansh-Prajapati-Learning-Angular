import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skinType',
  standalone: true
})
export class SkinTypePipe implements PipeTransform {

  transform(value : string):string {
    if(value === "All Skin Types"){
      return 'all-type';
    }else{
      return 'none';
    }
  }

}
