import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoDialogComponent } from './cartao-dialog.component';

describe('CartaoDialogComponent', () => {
  let component: CartaoDialogComponent;
  let fixture: ComponentFixture<CartaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
