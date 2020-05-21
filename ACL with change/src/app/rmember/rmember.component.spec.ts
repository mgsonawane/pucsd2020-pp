import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmemberComponent } from './rmember.component';

describe('RmemberComponent', () => {
  let component: RmemberComponent;
  let fixture: ComponentFixture<RmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
