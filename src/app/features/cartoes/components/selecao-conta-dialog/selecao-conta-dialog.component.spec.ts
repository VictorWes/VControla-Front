import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoContaDialogComponent } from './selecao-conta-dialog.component';

describe('SelecaoContaDialogComponent', () => {
  let component: SelecaoContaDialogComponent;
  let fixture: ComponentFixture<SelecaoContaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelecaoContaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecaoContaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
