import {Component, inject, OnInit} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {CosmeticListItemComponent} from "../cosmetic-list-item/cosmetic-list-item.component";
import {CurrencyPipe, DatePipe, LowerCasePipe, NgClass, NgForOf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {CosmeticService} from "../Services/cosmetic.service";
import {Router, RouterLink} from "@angular/router";
import {ProductSerialNumberPipe} from "../pipes/product-serial-number.pipe";
import {SkinTypePipe} from "../pipes/skin-type.pipe";
import {HoverHighlightDirective} from "../directives/hover-highlight.directive";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatBadgeModule} from '@angular/material/badge';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from "@angular/platform-browser";

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
    SkinTypePipe,
    HoverHighlightDirective,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.css'
})
export class CosmeticListComponent implements OnInit{
  readonly panelOpenState = signal(false);
  displayedColumns:string[]=['serialNumber','productName','price','color','skinType','userInformation'];
  userList: CosmeticProject[] = [];
 constructor(private cosmeticService: CosmeticService, private router : Router) {
   const iconRegistry = inject(MatIconRegistry);
   const sanitizer = inject(DomSanitizer);
   iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));}

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
