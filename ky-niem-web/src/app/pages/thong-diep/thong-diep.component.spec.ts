import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongDiepComponent } from './thong-diep.component';

describe('ThongDiepComponent', () => {
  let component: ThongDiepComponent;
  let fixture: ComponentFixture<ThongDiepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongDiepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongDiepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
