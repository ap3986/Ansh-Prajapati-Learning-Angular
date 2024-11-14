import {Component, Input, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {NgIf} from "@angular/common";
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

  constructor(
    private route : ActivatedRoute,
    private cosmeticService : CosmeticService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.cosmeticService.getCosmetics().subscribe(users => {
      this.userList = users;

    this.route.paramMap.subscribe(params => {
      const serialNumber = Number (params.get('serialNumber'));
      if (serialNumber){
        this.currentIndex = this.userList.findIndex(user => user.serialNumber === serialNumber);
        this.cosmetic=this.userList[this.currentIndex]
      }
    })
    })
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



