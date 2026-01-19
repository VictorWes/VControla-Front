import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContaDialogComponent } from './tipo-conta-dialog.component';

describe('TipoContaDialogComponent', () => {
  let component: TipoContaDialogComponent;
  let fixture: ComponentFixture<TipoContaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoContaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoContaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
