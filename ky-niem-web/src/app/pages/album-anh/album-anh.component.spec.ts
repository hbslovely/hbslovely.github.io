import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumAnhComponent } from './album-anh.component';

describe('AlbumAnhComponent', () => {
  let component: AlbumAnhComponent;
  let fixture: ComponentFixture<AlbumAnhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumAnhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
