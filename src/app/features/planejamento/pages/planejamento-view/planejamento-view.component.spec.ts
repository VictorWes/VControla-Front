import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanejamentoViewComponent } from './planejamento-view.component';

describe('PlanejamentoViewComponent', () => {
  let component: PlanejamentoViewComponent;
  let fixture: ComponentFixture<PlanejamentoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanejamentoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanejamentoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
