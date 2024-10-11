import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {CosmeticListComponent} from "./app/cosmetic-list/cosmetic-list.component";
import {ModifyListItemComponent} from "./app/modify-list-item/modify-list-item.component";
import {PageNotFoundComponent} from "./app/page-not-found/page-not-found.component";

const routes:Routes = [
  {path:'',redirectTo:'/items',pathMatch:'full'},
  {path:'items',component:CosmeticListComponent},
  {path:'modify-item',component:ModifyListItemComponent},
  {path:'**', component:PageNotFoundComponent},
]

bootstrapApplication(AppComponent, {
  providers:[provideRouter(routes)]
});
