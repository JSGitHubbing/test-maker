import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTestComponent } from './make-test.component';

describe('MakeTestComponent', () => {
  let component: MakeTestComponent;
  let fixture: ComponentFixture<MakeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
