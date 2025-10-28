import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarVotantes } from './cargar-votantes';

describe('CargarVotantes', () => {
  let component: CargarVotantes;
  let fixture: ComponentFixture<CargarVotantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarVotantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarVotantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
