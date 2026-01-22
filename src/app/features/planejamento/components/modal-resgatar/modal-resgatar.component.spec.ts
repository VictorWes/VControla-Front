import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResgatarComponent } from './modal-resgatar.component';

describe('ModalResgatarComponent', () => {
  let component: ModalResgatarComponent;
  let fixture: ComponentFixture<ModalResgatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalResgatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResgatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
