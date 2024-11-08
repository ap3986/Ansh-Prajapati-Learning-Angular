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
  imports: [
    NgIf,
    ReactiveFormsModule],
  templateUrl: './modify-list-item.component.html',
  styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit{
  cosmeticForm: FormGroup;
  cosmetic: CosmeticProject | undefined;
  error :string|null =null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cosmeticService: CosmeticService,
    private router: Router
  ){
    this.cosmeticForm = this.fb.group({
      serialNumber : [cosmeticService.generateNewserialNumber()],
      productName : [''],
      price : [''],
      color : [''],
      skinType : [''],
      userInformation : [false]
    });
  }



  ngOnInit(): void {
    //console.log("ngOnInit is working");
    const serialNumber = Number(this.route.snapshot.paramMap.get('serialNumber'));
    console.log(serialNumber);
    if (serialNumber) {
      console.log("Serial Number from route:", serialNumber);
      this.cosmeticService.getCosmeticByserialNumber(serialNumber).subscribe({
        next: cosmetic => {
          if (cosmetic) {
            this.cosmeticForm.patchValue(cosmetic);
            console.log("Cosmetic data loaded:", this.cosmeticForm.value);
          }
        },
        error: err => {
          this.error = 'Error fetching data';
          console.error("Error fetching data:", err);
        }
      });
    }
  }


  onSubmit(): void {
    if(this.cosmeticForm.valid){
      const cosmetic:CosmeticProject = this.cosmeticForm.value;
      //console.log("it is working" + this.cosmeticForm.value)
      if(cosmetic.serialNumber){
        this.cosmeticService.updateCosmetic(cosmetic).subscribe(() => this.router.navigate(['/cosmetics']));
      }else{
        cosmetic.serialNumber = this.cosmeticService.generateNewserialNumber();
        this.cosmeticService.addCosmetic(cosmetic).subscribe(()=>this.router.navigate(['cosmetics']));
      }
    }
  }


}
