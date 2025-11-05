import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidaVotanteComponent } from './bienvenida-votante';

describe('BienvenidaVotante', () => {
  let component: BienvenidaVotanteComponent;
  let fixture: ComponentFixture<BienvenidaVotanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienvenidaVotanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienvenidaVotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
