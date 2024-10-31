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
    return of (this.cosmetics)
  }

  getCosmeticByserialNumber(serialNumber:number): Observable<CosmeticProject | undefined>{
   return of (this.cosmetics.find(cosmetic => cosmetic.serialNumber === serialNumber));
  }

  addCosmetic(cosmetic:CosmeticProject): Observable<CosmeticProject>{
    this.cosmetics.push(cosmetic)
    return of (cosmetic)
  }

  updateCosmetic(updatedCosmetic : CosmeticProject ): Observable<CosmeticProject | undefined >{
    const index = this.cosmetics.findIndex(cosmetic => cosmetic.serialNumber == updatedCosmetic.serialNumber);
    if(index !== -1 ){
      this.cosmetics[index] = updatedCosmetic;
      return of (updatedCosmetic)
    }
    return of (undefined);
  }

  deleteCosmetic(serialNumber: number): void{
    this.cosmetics = this.cosmetics.filter(cosmetic => cosmetic.serialNumber !== serialNumber);
  }
  generateNewserialNumber(): number {
    return this.cosmetics.length > 0 ? Math.max(...this.cosmetics.map(cosmetic => cosmetic.serialNumber)) + 1 : 1;
  }

}
