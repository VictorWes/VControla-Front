import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiminuirSaldoComponent } from './modal-diminuir-saldo.component';

describe('ModalDiminuirSaldoComponent', () => {
  let component: ModalDiminuirSaldoComponent;
  let fixture: ComponentFixture<ModalDiminuirSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDiminuirSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDiminuirSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
