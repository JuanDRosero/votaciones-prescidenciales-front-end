import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirVotoComponent } from './emitir-voto';

describe('EmitirVoto', () => {
  let component: EmitirVotoComponent;
  let fixture: ComponentFixture<EmitirVotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitirVotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmitirVotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
