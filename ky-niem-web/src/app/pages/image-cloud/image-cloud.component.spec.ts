import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCloudComponent } from './image-cloud.component';

describe('ImageCloudComponent', () => {
  let component: ImageCloudComponent;
  let fixture: ComponentFixture<ImageCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCloudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
