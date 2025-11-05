import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalyerMobile } from './palyer-mobile';

describe('PalyerMobile', () => {
  let component: PalyerMobile;
  let fixture: ComponentFixture<PalyerMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalyerMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalyerMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
