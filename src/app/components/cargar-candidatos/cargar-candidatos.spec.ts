import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCandidatos } from './cargar-candidatos';

describe('CargarCandidatos', () => {
  let component: CargarCandidatos;
  let fixture: ComponentFixture<CargarCandidatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarCandidatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarCandidatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
