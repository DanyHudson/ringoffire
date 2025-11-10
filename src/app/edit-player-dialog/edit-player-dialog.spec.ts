import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerDialog } from './edit-player-dialog';

describe('EditPlayerDialog', () => {
  let component: EditPlayerDialog;
  let fixture: ComponentFixture<EditPlayerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlayerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlayerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
