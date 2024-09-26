import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticListItemComponent } from './cosmetic-list-item.component';

describe('CosmeticListItemComponent', () => {
  let component: CosmeticListItemComponent;
  let fixture: ComponentFixture<CosmeticListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CosmeticListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
