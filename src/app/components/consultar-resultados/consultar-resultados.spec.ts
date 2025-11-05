import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { ConsultarResultadosComponent } from './consultar-resultados';

describe('ConsultarResultados', () => {
  let component: ConsultarResultadosComponent;
  let fixture: ComponentFixture<ConsultarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
