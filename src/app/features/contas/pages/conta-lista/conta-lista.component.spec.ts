import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaListaComponent } from './conta-lista.component';

describe('ContaListaComponent', () => {
  let component: ContaListaComponent;
  let fixture: ComponentFixture<ContaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
