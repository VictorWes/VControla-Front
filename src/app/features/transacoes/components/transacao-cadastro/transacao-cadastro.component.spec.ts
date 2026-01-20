import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoCadastroComponent } from './transacao-cadastro.component';

describe('TransacaoCadastroComponent', () => {
  let component: TransacaoCadastroComponent;
  let fixture: ComponentFixture<TransacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransacaoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
