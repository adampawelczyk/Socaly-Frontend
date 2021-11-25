import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSideBarComponent } from './welcome-side-bar.component';

describe('WelcomeSideBarComponent', () => {
  let component: WelcomeSideBarComponent;
  let fixture: ComponentFixture<WelcomeSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
