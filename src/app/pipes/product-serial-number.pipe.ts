import { Pipe, PipeTransform } from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";

@Pipe({
  name: 'productSerialNumber',
  standalone: true
})
export class ProductSerialNumberPipe implements PipeTransform {

  transform(cosmetic: CosmeticProject): string {
    return `${cosmetic.serialNumber} ${cosmetic.productName}`;
  }

}
