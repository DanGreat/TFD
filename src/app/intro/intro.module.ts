import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';

import { LoginComponentComponent } from '../login-component/login-component.component';
import { SignupComponentComponent } from '../signup-component/signup-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [IntroPage, LoginComponentComponent, SignupComponentComponent],
  entryComponents: [LoginComponentComponent, SignupComponentComponent]
})
export class IntroPageModule {}
