import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { DonationComponent } from '../donation/donation.component';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AppInfoComponent } from '../app-info/app-info.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    IonicHeaderParallaxModule
  ],
  entryComponents: [DonationComponent, ContactUsComponent, AppInfoComponent, ProfilePageComponent],
  declarations: [SettingsPage, DonationComponent, ContactUsComponent, AppInfoComponent, ProfilePageComponent]
})
export class SettingsPageModule {}
