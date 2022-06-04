import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSavingAccountComponent } from './new-saving-account.component';

describe('NewSavingAccountComponent', () => {
  let component: NewSavingAccountComponent;
  let fixture: ComponentFixture<NewSavingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSavingAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSavingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
