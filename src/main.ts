import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {CosmeticListComponent} from "./app/cosmetic-list/cosmetic-list.component";
import {ModifyListItemComponent} from "./app/modify-list-item/modify-list-item.component";
import {PageNotFoundComponent} from "./app/page-not-found/page-not-found.component";
import {CosmeticListItemComponent} from "./app/cosmetic-list-item/cosmetic-list-item.component";
import {provideHttpClient} from "@angular/common/http";
import {InMemoryDataService} from "./app/Services/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {importProvidersFrom} from "@angular/core";

const routes:Routes = [
  {path:'',redirectTo:'/cosmetics',pathMatch:'full'},
  {path:'cosmetics',component:CosmeticListComponent},
  {path:'cosmetics/:serialNumber', component:CosmeticListItemComponent},
  {path:'modify-cosmetic',component:ModifyListItemComponent},
  {path:'**', component:PageNotFoundComponent},
]

bootstrapApplication(AppComponent, {
  providers:[
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 0 }))],
}).catch((err) => console.error(err));
