import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaldoComponent } from './modal-saldo.component';

describe('ModalSaldoComponent', () => {
  let component: ModalSaldoComponent;
  let fixture: ComponentFixture<ModalSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSaldoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
