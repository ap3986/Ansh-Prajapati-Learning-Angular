import {Component, Input} from '@angular/core';
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cosmetic-list-item',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './cosmetic-list-item.component.html',
  styleUrl: './cosmetic-list-item.component.css'
})
export class CosmeticListItemComponent {
  @Input() cosmetic?: CosmeticProject;
}


