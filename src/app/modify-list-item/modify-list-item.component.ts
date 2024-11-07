import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {min} from "rxjs";

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
      serialNumber: ['', Validators.required, Validators.pattern(/^[0-9]*$/),Validators.min(0)],
      productName: ['', Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/)],
      price: ['', Validators.required],
      color: [''],
      skinType: [''],
      userInformation:[false],
    });
  }

  ngOnInit(): void {
    const serialNumber = this.route.snapshot.paramMap.get('serialNumber');
    if (serialNumber) {
      this.cosmeticService.getCosmeticByserialNumber(+serialNumber).subscribe(cosmetic => {
        if(cosmetic) {
          this.cosmetic = cosmetic;

          this.cosmeticForm.patchValue(cosmetic);
        }
      });
    }
  }

  onSubmit(): void {
    const cosmetic: CosmeticProject = this.cosmeticForm.value;

    if (cosmetic.serialNumber) {
      this.cosmeticService.updateCosmetic(cosmetic);
    } else {
      // For adding a new student, generate a new ID
      const newserialNumber = this.cosmeticService.generateNewserialNumber();
      cosmetic.serialNumber = newserialNumber;
      this.cosmeticService.addCosmetic(cosmetic);
    }

    this.router.navigate(['/cosmetics']);
  }


}
