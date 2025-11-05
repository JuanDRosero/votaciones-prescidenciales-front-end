import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotanteLayout } from './votante-layout';

describe('VotanteLayout', () => {
  let component: VotanteLayout;
  let fixture: ComponentFixture<VotanteLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotanteLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotanteLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
