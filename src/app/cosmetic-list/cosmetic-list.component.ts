import {Component, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {CosmeticListItemComponent} from "../cosmetic-list-item/cosmetic-list-item.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CosmeticService} from "../Services/cosmetic.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    CosmeticListItemComponent,
    NgForOf,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.css'
})
export class CosmeticListComponent implements OnInit{
  displayedColumns:string[]=['serialNumber','productName','price','color','skinType','userInformation'];
  userList: CosmeticProject[] = [];
  error : string | null = null;
 constructor(private cosmeticService: CosmeticService,private router:Router) {
 }

  ngOnInit(): void {
   console.log("ngOnInit is working");
   this.cosmeticService.getCosmetics().subscribe({
     next :(data:CosmeticProject[]) => {
       this.userList = data
       this.error = null;
     },
     error: err => {
       this.error = 'Error fetching cosmetics';
       console.error("Error fetching Cosmetics", err);
     },
     complete: () => console.log("Cosmetic data fetch complete!")
   });
  }


selectedCosmetic?:CosmeticProject;
selectCosmetic (cosmetic: CosmeticProject): void {
    this.selectedCosmetic = cosmetic;
}

  delete(serialNumber:number): void {
    this.userList =this.userList.filter(cosmmetic => cosmmetic.serialNumber !== serialNumber)
  }

  navigateToCosmeticList(serialNumber:number): void {
    this.router.navigate(['/modify-cosmetic',serialNumber]);
  }
}
