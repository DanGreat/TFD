import { Component, OnInit, Input } from '@angular/core';
import {
  ModalController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private modal: ModalController,
    private toast: ToastController,
    private auth: AngularFireAuth,
    private loader: LoadingController,
    private nativeStorage: NativeStorage,
    private fileChooser: FileChooser,
    private file: File
  ) {}

  @Input() userName;
  @Input() photoPath;
  @Input() userEmail;

  ngOnInit() {}

  saveProfile() {
    this.presentLoading();
    const user = this.auth.currentUser;
    user.then((data) => {
      data
        .updateProfile({
          displayName: this.userName,
          photoURL: this.photoPath,
        })
        .then(() => {
          data
            .updateEmail(this.userEmail)
            .then(() => {
              this.nativeStorage.setItem('user-data', {
                userName: this.userName,
                userEmail: this.userEmail,
              });
              this.loader.dismiss();
              this.presentToast('User Updated Successfully!');
              this.modal
                .dismiss({
                  username: this.userName,
                  photo: this.photoPath,
                  mail: this.userEmail,
                })
                .catch((error) => {
                  console.log('Modal Close Error: ', error);
                });
            })
            .catch((error) => {
              this.loader.dismiss();
              console.log('Unable to update Email');
              this.presentToast('Unable to update Email!');
            });
        })
        .catch((error) => {
          console.log('Unable to update Profile');
          this.presentToast('Unable to update Profile!');
        });
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


  addPhoto() {
    this.fileChooser.open()
    .then((uri) => {
      console.log(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUri) => {
        console.log(JSON.stringify(newUri));

        let dirPath = newUri.nativeURL;
        const dirPathSegment = dirPath.split('/');
        dirPathSegment.pop();
        dirPath = dirPathSegment.join('/');

        this.file.readAsArrayBuffer(dirPath, newUri.name).then((buffer) => {
          this.photoPath = newUri.name;
          this.presentToast('Photo Added!');
          console.log('File name = ' + newUri.name);
          console.log('File directory = ' + buffer);
        });
      });
    })
    .catch(e => this.presentToast('Unable to select photo!'));
  }

  close() {
    this.modal.dismiss();
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Updating Profile...',
      spinner: 'crescent',
      animated: true,
      backdropDismiss: false,
      showBackdrop: false,
    });

    await loading.present();
  }
}
