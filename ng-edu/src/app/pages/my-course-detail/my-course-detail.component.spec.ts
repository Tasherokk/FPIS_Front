import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseDetailComponent } from './my-course-detail.component';

describe('MyCourseDetailComponent', () => {
  let component: MyCourseDetailComponent;
  let fixture: ComponentFixture<MyCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCourseDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
