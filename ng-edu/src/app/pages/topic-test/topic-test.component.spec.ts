import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicTestComponent } from './topic-test.component';

describe('TopicTestComponent', () => {
  let component: TopicTestComponent;
  let fixture: ComponentFixture<TopicTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
