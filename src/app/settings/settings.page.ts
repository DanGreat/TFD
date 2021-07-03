import { Component, OnInit } from '@angular/core';
import { SharedComponentService } from '../shared-component.service';
import { Platform, PopoverController, ModalController, ToastController } from '@ionic/angular';
import { DonationComponent } from '../donation/donation.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { AppInfoComponent } from '../app-info/app-info.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  username;
  email;
  value;
  photo;

  constructor(
    private themeService: SharedComponentService,
    private pltForm: Platform,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private toast: ToastController,
    private nativeStorage: NativeStorage,
    private fireAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('DARK-THEME').then(theme => {
      this.value = theme;
    });

    // this.themeService.theme$.subscribe(res => {
    //   this.value = res;
    // });
    // this.nativeStorage.getItem('user-data').then(userData => {
    //   user.updateProfile({
    //     displayName: userData.userName,
    //     photoURL: ''
    //   }).then(() => {
    //     console.log('User Updated');
    //   }).catch((error) => {
    //     console.log('Authentication Error: ', error);
    //   });
    // });

    const user = this.fireAuth.currentUser;
    user
      .then((data) => {
        console.log('Data: ', data.providerData);
        data.providerData.forEach((profile) => {
          console.log("User Profile: ", profile);
          this.username =  profile.displayName !== null ? profile.displayName : 'Welcome';
          this.email = profile.email;
          this.photo = profile.photoURL !== null ? profile.photoURL : '../assets/tfd-logo.png';
        });
      })
      .catch((error) => {
        console.log('User Data Error:', error);
      });

  }

  themeValue() {
    console.log(this.value);
    this.nativeStorage.setItem('DARK-THEME', this.value);
    this.themeService.setTheme(this.value);
  }

  makeDonation() {
    this.presentPopover();
  }

  contactUs() {
    this.presentModal();
  }

  appInfo() {
    this.presentAppInfo();
  }

  profilePage() {
    this.profileModal();
  }

  resetPassword() {
    const auth = this.fireAuth;
    auth.sendPasswordResetEmail(this.email).then(() => {
      this.presentToast('An email will be sent to you!');
    }).catch((error) => {
      this.presentToast('An error occured reseting your password!');
    });
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: `${message}`,
      position: 'bottom',
      duration: 3000,
    });

    await toast.present();
  }

  async presentPopover() {
    const popover = await this.popoverCtrl.create({
      component: DonationComponent,
      translucent: true,
    });

    await popover.present();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ContactUsComponent,
    });

    await modal.present();
  }

  async presentAppInfo() {
    const modal = await this.modalCtrl.create({
      component: AppInfoComponent,
    });

    await modal.present();
  }

  async profileModal() {
    const mymodal = await this.modalCtrl.create({
      component: ProfilePageComponent,
      backdropDismiss: false,
      componentProps: {
        userName: this.username,
        userEmail: this.email,
        photoPath: this.photo
      },
    });

    mymodal
      .onDidDismiss()
      .then((response) => {
        console.log('Close response: ', response);
        const value = response.data;
        this.username = value.username;
        this.email = value.mail;
        this.photo = value.photo;
      })
      .catch((error) => {
        console.log(error);
      });

    return await mymodal.present();
  }
}
