import { Component } from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {CosmeticListItemComponent} from "../cosmetic-list-item/cosmetic-list-item.component";
import {NgClass, NgForOf} from "@angular/common";
import {CosmeticService} from "../Services/cosmetic.service";

@Component({
  selector: 'app-cosmetic-list',
  standalone: true,
  imports: [
    CosmeticListItemComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './cosmetic-list.component.html',
  styleUrl: './cosmetic-list.component.css'
})
export class CosmeticListComponent {
 constructor(private cosmeticService: CosmeticService) {
 }
}
