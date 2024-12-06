import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {CosmeticListComponent} from "./app/cosmetic-list/cosmetic-list.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes:Routes = [
  {path:'',redirectTo:'/cosmetics',pathMatch:'full'},
  {path:'cosmetics',component:CosmeticListComponent},
  {path:'cosmetics/:serialNumber', loadComponent: () =>
      import('./app/cosmetic-list-item/cosmetic-list-item.component').then(m => m.CosmeticListItemComponent)},
  {path:'modify-cosmetic',loadComponent: () =>
      import('./app/modify-list-item/modify-list-item.component').then(m => m.ModifyListItemComponent)},
  {path:'**',loadComponent: () =>
      import('./app/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)},
]

bootstrapApplication(AppComponent, {
  providers:[provideRouter(routes), provideAnimationsAsync()]
});
