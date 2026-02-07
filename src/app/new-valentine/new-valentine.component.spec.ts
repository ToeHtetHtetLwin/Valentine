import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewValentineComponent } from './new-valentine.component';

describe('NewValentineComponent', () => {
  let component: NewValentineComponent;
  let fixture: ComponentFixture<NewValentineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewValentineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewValentineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
