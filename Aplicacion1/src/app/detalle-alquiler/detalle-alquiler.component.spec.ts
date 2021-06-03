import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlquilerComponent } from './detalle-alquiler.component';

describe('DetalleAlquilerComponent', () => {
  let component: DetalleAlquilerComponent;
  let fixture: ComponentFixture<DetalleAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlquilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
