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
}
