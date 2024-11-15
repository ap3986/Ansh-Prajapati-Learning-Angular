import {Component, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {CosmeticListItemComponent} from "../cosmetic-list-item/cosmetic-list-item.component";
import {CurrencyPipe, DatePipe, LowerCasePipe, NgClass, NgForOf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {CosmeticService} from "../Services/cosmetic.service";
import {Router, RouterLink} from "@angular/router";
import {ProductSerialNumberPipe} from "../pipes/product-serial-number.pipe";
import {SkinTypePipe} from "../pipes/skin-type.pipe";

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    CosmeticListItemComponent,
    NgForOf,
    NgClass,
    RouterLink,
    CurrencyPipe,
    UpperCasePipe,
    LowerCasePipe,
    ProductSerialNumberPipe,
    TitleCasePipe,
    SkinTypePipe
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.css'
})
export class CosmeticListComponent implements OnInit{
  displayedColumns:string[]=['serialNumber','productName','price','color','skinType','userInformation'];
  userList: CosmeticProject[] = [];
 constructor(private cosmeticService: CosmeticService, private router : Router) {
 }

  ngOnInit(): void {
   this.cosmeticService.getCosmetics().subscribe({
     next :(data:CosmeticProject[]) => this.userList = data
   })
  }


selectedCosmetic?:CosmeticProject;
selectCosmetic (cosmetic: CosmeticProject): void {
    this.selectedCosmetic = cosmetic;
}

  onDelete(serialNumber:number): void {
    this.userList =this.userList.filter(cosmmetic => cosmmetic.serialNumber !== serialNumber)
  }

  navigateToCosmeticList(): void {
    this.router.navigate(['/modify-cosmetic']);
  }
}
