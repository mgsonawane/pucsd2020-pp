import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuttComponent } from './putt.component';

describe('PuttComponent', () => {
  let component: PuttComponent;
  let fixture: ComponentFixture<PuttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
