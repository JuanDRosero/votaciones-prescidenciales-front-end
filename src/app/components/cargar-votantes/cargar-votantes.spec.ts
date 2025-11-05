import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarVotantesComponent } from './cargar-votantes';

describe('CargarVotantes', () => {
  let component: CargarVotantesComponent;
  let fixture: ComponentFixture<CargarVotantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarVotantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarVotantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
