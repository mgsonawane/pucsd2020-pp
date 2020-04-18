import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettComponent } from './gett.component';

describe('GettComponent', () => {
  let component: GettComponent;
  let fixture: ComponentFixture<GettComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
