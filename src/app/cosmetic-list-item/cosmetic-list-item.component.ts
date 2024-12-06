import {Component, inject, Input, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {CurrencyPipe, LowerCasePipe, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";
import { ChangeDetectionStrategy } from '@angular/core';
import {HoverHighlightDirective} from "../directives/hover-highlight.directive";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;


@Component({
  selector: 'app-cosmetic-list-item',
  standalone: true,
  imports: [
    NgIf,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    HoverHighlightDirective,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatIconModule,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatList,
    MatListItem,
    MatDivider,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

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
    private router : Router,

  ) { const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));}
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



