import { Injectable } from '@angular/core';
import {catchError, Observable, of, throwError} from "rxjs";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {userList} from "../Shared/data/mock-content";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})

export class CosmeticService {
  private apiUrl = 'api/cosmetics';
  private cosmetics : CosmeticProject[] = userList;
  constructor(private http: HttpClient) { }
  getCosmetics(): Observable<CosmeticProject[]> {
    return this.http.get<CosmeticProject[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getCosmeticByserialNumber(serialNumber:number): Observable<CosmeticProject>{
    return this.http.get<CosmeticProject>(`${this.apiUrl}/${serialNumber}`).pipe(catchError(this.handleError));  }

  addCosmetic(cosmetic:CosmeticProject): Observable<CosmeticProject>{
    cosmetic.serialNumber = this.generateNewserialNumber();
    return this.http.post<CosmeticProject>(this.apiUrl, cosmetic).pipe(catchError(this.handleError));

  }

  updateCosmetic(cosmetic: CosmeticProject): Observable<CosmeticProject | undefined> {
    const url = `${this.apiUrl}/${cosmetic.serialNumber}`;
    return this.http.put<CosmeticProject>(url, cosmetic).pipe(catchError(this.handleError));
  }


  deleteCosmetic(serialNumber: number): Observable<{}> {
    const url = `${this.apiUrl}/${serialNumber}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }
  generateNewserialNumber(): number {
    return this.cosmetics.length > 0 ? Math.max(...this.cosmetics.map(cosmetic => cosmetic.serialNumber)) + 1 : 1;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error('Server error, please try again.'));
  }
}
