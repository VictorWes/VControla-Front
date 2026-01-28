import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoDialogComponent } from './pagamento-dialog.component';

describe('PagamentoDialogComponent', () => {
  let component: PagamentoDialogComponent;
  let fixture: ComponentFixture<PagamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
