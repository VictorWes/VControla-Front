import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoListaComponent } from './transacao-lista.component';

describe('TransacaoListaComponent', () => {
  let component: TransacaoListaComponent;
  let fixture: ComponentFixture<TransacaoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransacaoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
