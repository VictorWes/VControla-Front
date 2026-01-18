import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDialogComponent } from './conta-dialog.component';

describe('ContaDialogComponent', () => {
  let component: ContaDialogComponent;
  let fixture: ComponentFixture<ContaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
