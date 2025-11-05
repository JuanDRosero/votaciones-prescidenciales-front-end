import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarPeriodoComponent } from './configurar-periodo';

describe('ConfigurarPeriodo', () => {
  let component: ConfigurarPeriodoComponent;
  let fixture: ComponentFixture<ConfigurarPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarPeriodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
