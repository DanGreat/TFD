import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { AboutPageComponent } from '../about-page/about-page.component';

import { GeneralPage } from './general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralPageRoutingModule
  ],
  entryComponents: [AboutPageComponent],
  declarations: [GeneralPage, AboutPageComponent]
})
export class GeneralPageModule {}
