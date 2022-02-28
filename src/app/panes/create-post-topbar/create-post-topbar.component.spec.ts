import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostTopbarComponent } from './create-post-topbar.component';

describe('CreatePostTopbarComponent', () => {
  let component: CreatePostTopbarComponent;
  let fixture: ComponentFixture<CreatePostTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostTopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
