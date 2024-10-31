import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";
import {CosmeticProject} from "../Shared/models/cosmeticProject";

@Component({
  selector: 'app-modify-list-item',
  standalone: true,
  imports: [ FormsModule,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './modify-list-item.component.html',
  styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit{
  cosmeticForm: FormGroup;
  cosmetic: CosmeticProject | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private router: Router
  ){
    this.cosmeticForm = this.fb.group({
      serialNumber: ['', Validators.required],
      productName: ['', Validators.required],
      price: ['', Validators.required],
      color: [''],
      skinType: [''],
      userInformation:[false],
    });
  }

  ngOnInit(): void {
  }
}
