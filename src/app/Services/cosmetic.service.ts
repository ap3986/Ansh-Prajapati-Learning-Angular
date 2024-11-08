import { Injectable } from '@angular/core';
import {catchError, Observable, of, throwError} from "rxjs";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {userList} from "../Shared/data/mock-content";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})

export class CosmeticService {
  //private apiUrl = 'api/cosmetics';

  apiUrl = 'api/cosmetics';

  //local copy of cosmetics
  private cosmetics : CosmeticProject[] = userList;
  constructor(private http:HttpClient) { }
  getCosmetics(): Observable<CosmeticProject[]>{
    return this.http.get<CosmeticProject[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getCosmeticByserialNumber(serialNumber:number): Observable<CosmeticProject>{
   return this.http.get<CosmeticProject>(`${this.apiUrl}/${serialNumber}`).pipe(catchError(this.handleError));
  }

  addCosmetic(newCosmetic:CosmeticProject): Observable<CosmeticProject>{
    newCosmetic.serialNumber = this.generateNewserialNumber();
    return this.http.post<CosmeticProject>(this.apiUrl,newCosmetic).pipe(catchError(this.handleError));
  }

  updateCosmetic(updatedCosmetic : CosmeticProject ): Observable<CosmeticProject | undefined >{
    const url = `${this.apiUrl}/${updatedCosmetic.serialNumber}`;
    return this.http.put<CosmeticProject>(url,updatedCosmetic).pipe(catchError(this.handleError));
  }

  deleteCosmetic(serialNumber: number): void{
    this.cosmetics = this.cosmetics.filter(cosmetic => cosmetic.serialNumber !== serialNumber);
  }
  generateNewserialNumber(): number {
    return this.cosmetics.length > 0 ? Math.max(...this.cosmetics.map(cosmetic => cosmetic.serialNumber)) + 100 : 1;
  }

  private handleError(error:HttpErrorResponse){
    console.error('API error:',error);
    return throwError(()=>new Error('Server error,Please try again'));
  }

}
