import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';
import { VideoPageComponent } from '../video-page/video-page.component';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  entryComponents: [VideoPageComponent],
  declarations: [MainPage, VideoPageComponent]
})
export class MainPageModule {}
