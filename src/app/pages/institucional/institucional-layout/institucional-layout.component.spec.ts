import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionalLayoutComponent } from './institucional-layout.component';

describe('InstitucionalLayoutComponent', () => {
  let component: InstitucionalLayoutComponent;
  let fixture: ComponentFixture<InstitucionalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitucionalLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
