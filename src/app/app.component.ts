import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CosmeticProject} from "./models/cosmeticProject";
import {NgForOf, NgIf} from "@angular/common";
import {CosmeticListComponent} from "./cosmetic-list/cosmetic-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, CosmeticListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aura Allure';
  userList : CosmeticProject[] = [
  {serialNumber: 100, productName: "Glow Serum", price: 20, color: "Soft Rose", skinType: "Normal Skin", userInformation: "No"},
  {serialNumber: 200, productName: "Hydration Booster", price: 25, color: "Crystal Clear", skinType: "Dry Skin", userInformation: "No"},
  {serialNumber: 300, productName: "Mattifying Primer", price: 30, color: "Mint Green", skinType: "Oily Skin", userInformation: "Yes"},
  {serialNumber: 400, productName: "Youthful Glow Cream", price: 35, color: "Lavender Mist", skinType: "Mature Skin", userInformation: "No"},
  {serialNumber: 500, productName: "Blissful Blush", price: 18, color: "Peachy Pink", skinType: "All Skin Types", userInformation: "No"},
  {serialNumber: 600, productName: "Ethereal Eyeshadow Palette", price: 40, color: "Vibrant Mix", skinType: "All Skin Types", userInformation: "Yes"}

]
}
