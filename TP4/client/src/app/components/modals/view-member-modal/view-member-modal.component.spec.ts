import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberModalComponent } from './view-member-modal.component';

describe('ViewMemberModalComponent', () => {
  let component: ViewMemberModalComponent;
  let fixture: ComponentFixture<ViewMemberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
