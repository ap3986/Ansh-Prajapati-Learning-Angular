import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {userList} from "../Shared/data/mock-content";

@Injectable({
  providedIn: 'root'
})
export class CosmeticService {
  private cosmetics : CosmeticProject[] = userList;


  constructor() { }
  getCosmetics(): Observable<CosmeticProject[]>{
    return of (userList)
  }

  addCosmetics(newProduct:CosmeticProject): Observable<CosmeticProject[]>{
    this.cosmetics.push(newProduct)
    return of (this.cosmetics)
  }

  updateCosmetics(updatedProduct : CosmeticProject ): Observable<CosmeticProject[]>{
    const index = this.cosmetics.findIndex(product => product.serialNumber == updatedProduct.serialNumber);
    if(index !== -1 ){
      this.cosmetics[index] = updatedProduct;
    }
    return of (this.cosmetics);
  }

  deleteCosmetics(cosmeticSerialNumber: number):Observable<CosmeticProject[]>{
    this.cosmetics = this.cosmetics.filter(product => product.serialNumber !== cosmeticSerialNumber);
    return of (this.cosmetics);
  }

getCosmeticsByserialNumber(cosmeticSerialNumber:number): Observable<CosmeticProject | undefined>{
    const cosmetic =this.cosmetics.find(product => product.serialNumber === cosmeticSerialNumber);
    return of (cosmetic)
}
}
