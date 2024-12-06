import {Component, model, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CosmeticService} from "../Services/cosmetic.service";
import {CosmeticProject} from "../Shared/models/cosmeticProject";
import {HighlightOnFocusDirective} from "../directives/highlight-on-focus.directive";
import {MatList} from "@angular/material/list";
import {MatHint, MatLabel} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import { ChangeDetectionStrategy } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { MatListItem} from "@angular/material/list";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkScrollable } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-modify-list-item',
  standalone: true,
  imports: [FormsModule,
    NgIf,
    ReactiveFormsModule, HighlightOnFocusDirective, MatList, MatLabel, MatDivider, MatCheckbox, MatCardHeader,
    MatCardContent,
    MatCard,
    MatIconModule,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatListItem,
    MatListModule,
    MatDividerModule, MatDatepickerInput, MatDatepickerToggle, MatHint, MatDatepicker,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCheckboxModule,
    MatTooltipModule,
    CdkScrollable

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modify-list-item.component.html',
  styleUrl: './modify-list-item.component.css'
})
export class ModifyListItemComponent implements OnInit{

  cosmeticForm: FormGroup;
  cosmetic: CosmeticProject | undefined;
  error: string | null = null;
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before'| 'after'>('after');
  readonly disabled = model(false);

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
