import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttComponent } from './postt.component';

describe('PosttComponent', () => {
  let component: PosttComponent;
  let fixture: ComponentFixture<PosttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
