import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuessWordComponent } from './guess-word.component';

describe('GuessWordComponent', () => {
  let component: GuessWordComponent;
  let fixture: ComponentFixture<GuessWordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GuessWordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
