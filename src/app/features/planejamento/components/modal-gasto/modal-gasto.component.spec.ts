import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGastoComponent } from './modal-gasto.component';

describe('ModalGastoComponent', () => {
  let component: ModalGastoComponent;
  let fixture: ComponentFixture<ModalGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalGastoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
