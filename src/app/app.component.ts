import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CosmeticProject} from "./Shared/models/cosmeticProject";
import {NgForOf, NgIf} from "@angular/common";
import {CosmeticListComponent} from "./cosmetic-list/cosmetic-list.component";
import {CosmeticListItemComponent} from "./cosmetic-list-item/cosmetic-list-item.component";
import {CosmeticService} from "./Services/cosmetic.service";
import {userList} from "./Shared/data/mock-content";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, CosmeticListComponent, CosmeticListItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private cosmeticService: CosmeticService) {

  }

  title = 'Aura Allure';

  cosmetic : CosmeticProject | undefined;
  ngOnInit(): void {
    this.cosmeticService.getCosmeticsByserialNumber(100).subscribe({
      next :(data: CosmeticProject | undefined) => this.cosmetic =data
    })
  }

}
