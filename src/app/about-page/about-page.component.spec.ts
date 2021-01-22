import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutPageComponent } from './about-page.component';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
