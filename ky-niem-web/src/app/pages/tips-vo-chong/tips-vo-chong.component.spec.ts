import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsVoChongComponent } from './tips-vo-chong.component';

describe('TipsVoChongComponent', () => {
  let component: TipsVoChongComponent;
  let fixture: ComponentFixture<TipsVoChongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsVoChongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsVoChongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
