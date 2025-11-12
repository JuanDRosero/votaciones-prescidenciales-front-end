import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimularVotacion } from './simular-votacion';

describe('SimularVotacion', () => {
  let component: SimularVotacion;
  let fixture: ComponentFixture<SimularVotacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimularVotacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimularVotacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
