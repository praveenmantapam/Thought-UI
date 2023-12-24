import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWiztreeComponent } from './ngx-wiztree.component';

describe('NgxWiztreeComponent', () => {
  let component: NgxWiztreeComponent;
  let fixture: ComponentFixture<NgxWiztreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxWiztreeComponent]
    });
    fixture = TestBed.createComponent(NgxWiztreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
