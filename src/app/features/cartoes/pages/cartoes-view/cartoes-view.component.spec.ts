import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesViewComponent } from './cartoes-view.component';

describe('CartoesViewComponent', () => {
  let component: CartoesViewComponent;
  let fixture: ComponentFixture<CartoesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartoesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartoesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
