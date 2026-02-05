import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaganComponent } from './bagan.component';

describe('BaganComponent', () => {
  let component: BaganComponent;
  let fixture: ComponentFixture<BaganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaganComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
