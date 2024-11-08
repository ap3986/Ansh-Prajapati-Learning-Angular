import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {of} from "rxjs";

@Component({
  selector: 'app-modify-list-item',
  standalone: true,
  imports: [ FormsModule,
    NgIf,
    ReactiveFormsModule],
  templateUrl: './modify-list-item.component.html',
  styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit {
  cosmeticForm: FormGroup;
  cosmetic: CosmeticProject | undefined;
  error: string | null = null;
  path:string = "/cosmetics";

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private router: Router
  ) {
    this.cosmeticForm = this.fb.group({
      serialNumber: [cosmeticService.generateNewserialNumber()],
      productName: [''],
      price: [''],
      color: [''],
      skinType: [''],
      userInformation: [false],
    });
  }

  ngOnInit(): void {

    //console.log("Modify ngoninit working");
    //console.log(this.route.snapshot.paramMap);
    const serialNumber = Number(this.route.snapshot.paramMap.get('serialNumber'));
    console.log(serialNumber);
    if (serialNumber) {
      console.log(serialNumber);
      this.cosmeticService.getCosmeticByserialNumber(serialNumber).subscribe({
        next: cosmetic => {
          console.log("Next is working");
          if (cosmetic) {
            this.cosmeticForm.patchValue(cosmetic);
            console.log(this.cosmeticForm.value);
            console.log("Completely get data");
          }else {
            console.warn("No cosmetic data received");
            this.error = 'No data received for the given serial number';
          }
        },
        error: err => {
          this.error = 'Error fetching cosmetic';
          console.error('Error fetching cosmetic:', err);
        },
        complete: () => console.log("Subscription completed successfully.")
      });
    }else{
      console.warn("Serial number is invalid or missing");
    }
  }
  onSubmit(): void {
    if (this.cosmeticForm.valid) {
      console.log(this.cosmeticForm.valid); //true
      const cosmetic: CosmeticProject = this.cosmeticForm.value;
      console.log(cosmetic);
      if (cosmetic.serialNumber) {
        console.log(cosmetic.serialNumber);
        this.cosmeticService.updateCosmetic(cosmetic).subscribe(() => this.router.navigate([this.path]));
      } else {
        console.log("Different number");
        cosmetic.serialNumber = this.cosmeticService.generateNewserialNumber();
        this.cosmeticService.addCosmetic(cosmetic).subscribe(() => this.router.navigate(['/cosmetics']));
      }
    }

  }
  delete(): void {
    const serialNumber = this.cosmeticForm.value.serialNumber;
    if (serialNumber) {
      this.cosmeticService.deleteCosmetic(serialNumber).subscribe(() => this.router.navigate(['/cosmetics']));
    }
  }

  navigateToCosmeticList(): void {
    this.router.navigate(['/cosmetics']);
  }
}
