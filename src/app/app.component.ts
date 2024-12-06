import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {CosmeticListComponent} from "./cosmetic-list/cosmetic-list.component";
import {CosmeticListItemComponent} from "./cosmetic-list-item/cosmetic-list-item.component";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgForOf, NgIf, CosmeticListComponent, CosmeticListItemComponent, MatButton, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  // constructor(private cosmeticService: CosmeticService) {
  //
  // }

  title = 'Aura Allure';

  // cosmetic : CosmeticProject | undefined;
  // ngOnInit(): void {
  //   this.cosmeticService.getCosmeticsByserialNumber(100).subscribe({
  //     next :(data: CosmeticProject | undefined) => this.cosmetic =data
  //   })
  // }

}

