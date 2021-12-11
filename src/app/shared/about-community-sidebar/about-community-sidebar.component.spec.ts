import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCommunitySidebarComponent } from './about-community-sidebar.component';

describe('AboutCommunitySidebarComponent', () => {
  let component: AboutCommunitySidebarComponent;
  let fixture: ComponentFixture<AboutCommunitySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCommunitySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCommunitySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
