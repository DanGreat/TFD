import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.scss'],
})
export class SignupComponentComponent implements OnInit {
  signUpForm: FormGroup;

  passwordType = 'password';
  passwordIcon = 'eye-off-outline';

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private toast: ToastController,
    private storage: NativeStorage,
    private loader: LoadingController
  ) {
    this.signUpForm = this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-@]+@[a-zA-Z0-9-]+.[a-zA-Z]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  ngOnInit() {}

  close = () => {
    this.modalCtrl.dismiss();
  }

  showHidePassword() {
    if (
      this.passwordType === 'password' &&
      this.passwordIcon === 'eye-off-outline'
    ) {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }

  signUp() {
    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    if (username && email && password) {
      this.presentLoading();
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.storage.setItem('user-data', {
            userName: username,
            userEmail: email,
          });
          this.loader.dismiss();
          this.presentToast('Account  Successfully Created!');
          this.close();
          this.loginModal();
        })
        .catch((error) => {
          console.log('Error: ', error);
          this.presentToast(error.message);
        });
    }
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: `${message}`,
      position: 'bottom',
      duration: 3000,
    });

    await toast.present();
  }

  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponentComponent,
      animated: true,
    });
    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Signing you in...',
      spinner: 'crescent',
      animated: true,
      backdropDismiss: false,
      showBackdrop: false,
    });

    await loading.present();
  }
}
