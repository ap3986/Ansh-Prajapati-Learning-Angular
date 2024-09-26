import {Component, Input} from '@angular/core';
import {CosmeticProject} from "../models/cosmeticProject";

@Component({
  selector: 'app-cosmetic-list-item',
  standalone: true,
  imports: [],
  templateUrl: './cosmetic-list-item.component.html',
  styleUrl: './cosmetic-list-item.component.css'
})
export class CosmeticListItemComponent {
  @Input() cosmetic?: CosmeticProject;
}
