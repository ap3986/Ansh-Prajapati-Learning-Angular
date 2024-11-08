import {Component, Input, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {NgIf} from "@angular/common";
import {userList} from "../Shared/data/mock-content";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";

@Component({
  selector: 'app-cosmetic-list-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './cosmetic-list-item.component.html',
  styleUrl: './cosmetic-list-item.component.css'
})
export class CosmeticListItemComponent implements OnInit{
  cosmetic : CosmeticProject | undefined;
  userList : CosmeticProject[] = [];
  currentIndex : number = 0;
  error:string|null = null;

  constructor(
    private route : ActivatedRoute,
    private cosmeticService : CosmeticService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.cosmeticService.getCosmetics().subscribe({
      next:(cosmetics:CosmeticProject[])=>{
        this.userList = cosmetics;
        this.error = null;

        this.route.paramMap.subscribe(params=>{
          const id = Number(params.get('serialNumber'));
          if(id){
            this.currentIndex = this.userList.findIndex(cos=>cos.serialNumber===id);
            this.cosmetic = this.userList[this.currentIndex];
          }
        });
      },
      error:(err)=>{
        this.error='Error fetching cosmetics';
        console.error("Error fetching cosmetics",err);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/cosmetics'])
  }

  goForward() : void{
    if(this.currentIndex < this.userList.length - 1){
      this.currentIndex++;
      this.router.navigate(['/cosmetics',
      this.userList[this.currentIndex].serialNumber]);
    }
  }
  goBackward(): void{
    if(this.currentIndex>0){
      this.currentIndex --;
      this.router.navigate(['/cosmetics',this.userList[this.currentIndex].serialNumber]);
    }
  }

}



