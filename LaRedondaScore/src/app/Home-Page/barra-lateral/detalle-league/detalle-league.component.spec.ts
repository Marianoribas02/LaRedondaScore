import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesLeagueComponent } from './detalle-league.component';

describe('DetalleLeagueComponent', () => {
  let component: DetallesLeagueComponent;
  let fixture: ComponentFixture<DetallesLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesLeagueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
