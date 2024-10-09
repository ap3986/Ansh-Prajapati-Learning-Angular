import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from "@angular/router";
import {CosmeticListComponent} from "./app/cosmetic-list/cosmetic-list.component";

const routes:Routes = [
  {path:'',redirectTo:'/items',pathMatch:'full'},
  {path:'items',component:CosmeticListComponent},
]

bootstrapApplication(AppComponent, {
  providers:[provideRouter(routes)]
});
