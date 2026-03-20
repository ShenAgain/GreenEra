import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPickupHistoryComponent } from './view-pickup-history.component';

describe('ViewPickupHistoryComponent', () => {
  let component: ViewPickupHistoryComponent;
  let fixture: ComponentFixture<ViewPickupHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPickupHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPickupHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
