import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActionSheetController, ModalController, LoadingController,
  Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AboutPageComponent } from '../about-page/about-page.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SharedComponentService } from '../shared-component.service';


@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit, OnDestroy {

  // hideTabbar = false;
  // hideToolbar = false;
  // currentPos = 150;

  constructor(private actionCtrl: ActionSheetController,
              private route: Router,
              private auth: AngularFireAuth,
              private modal: ModalController,
              private loadingCtrl: LoadingController,
              private platform: Platform,
              private toast: ToastController,
              private nativeStorage: NativeStorage,
              private theme: SharedComponentService
              ) {

                this.platform.backButton.subscribeWithPriority(10, (re) => {
                  console.log('Exit: ', re);
               });

                const user = this.auth.currentUser;
                user.then(data => {
                  this.nativeStorage.getItem('user-data').then(userData => {
                    data.updateProfile({
                      displayName: userData.userName,
                      photoURL: ''
                    }).then(() => {
                      console.log('User Updated');
                    }).catch((error) => {
                      console.log('Authentication Error: ', error);
                    });
                  });
                });
              }


  ngOnInit() {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('VERIFICATION-SENT').then(verified => {
        if (!verified || verified == null) {
          this.auth.currentUser.then(user => {
            user.sendEmailVerification()
            .then(() => {
              this.presentToast('Verification Email Sent');
              this.nativeStorage.setItem('VERIFICATION-SENT', true);
            })
            .catch((error) => {
              this.presentToast('Error Verifying Email!');
            });
          });
        }
      });
    }).catch(err => {
      console.error('Platform not ready to display streams', err);
    });
  }

  actionSheet = async () => {
     const action = this.actionCtrl.create({
      header: 'More Options',
      mode: 'ios',
      cssClass: '.actionStyle',
      buttons: [
        { text: 'Settings', role: 'destructive', handler: () => {
            this.route.navigate(['/settings']);
          }
        },
        { text: 'Share', role: 'destructive', handler: () => {

          }
        },
        { text: 'About', role: 'destructive', handler: () => {
            this.aboutModal();
          }
        },
        { text: 'Logout', role: 'destructive', handler: () => {
          this.theme.theme$.subscribe(value => {
            this.nativeStorage.setItem('DARK_THEME', value);
          });
          this.auth.signOut().then(() => {
            this.route.navigate(['/intro']);
          }).catch(error => {
            console.log('Log out Error: ', error);
          });
          }
        }
      ]
     });

     (await action).present();

  }

  async aboutModal() {
    const modal = await this.modal.create({
      component: AboutPageComponent,
      animated: true
    });
    return await modal.present();
  }


  // pageScroll(ev: CustomEvent) {
  //   const scrollTop = ev.detail.scrollTop;
  //   if (scrollTop > this.currentPos ) {
  //     this.hideTabbar = true;
  //   } else if (scrollTop <= this.currentPos) {
  //     this.hideTabbar = false;
  //   }
  //   this.currentPos = scrollTop;
  // }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: `${message}`,
      position: 'bottom',
      duration: 3000,
    });

    await toast.present();
  }


  ngOnDestroy() {
    console.log('Destroyed');
  }
}
