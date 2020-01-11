import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfessionsPage } from './confessions.page';

describe('ConfessionsPage', () => {
  let component: ConfessionsPage;
  let fixture: ComponentFixture<ConfessionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfessionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
