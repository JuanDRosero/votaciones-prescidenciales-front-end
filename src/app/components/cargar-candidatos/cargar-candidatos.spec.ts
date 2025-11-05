import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCandidatosComponent } from './cargar-candidatos';

describe('CargarCandidatosComponent', () => {
  let component: CargarCandidatosComponent;
  let fixture: ComponentFixture<CargarCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarCandidatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
