import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { LoadingController, AlertController, ModalController} from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;

  passwordType = 'password';
  passwordIcon = 'eye-off-outline';

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private loader: LoadingController,
    private alert: AlertController,
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private actvRoute: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
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

  showHidePassword() {
    if (this.passwordType === 'password' && this.passwordIcon === 'eye-off-outline') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off-outline';
    }
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Loging In...',
      spinner: 'crescent',
      backdropDismiss: false,
      showBackdrop: false,
    });

    await loading.present();
  }

  async loginAlert(message) {
    const alert = await this.alert.create({
      header: 'Oops!',
      backdropDismiss: false,
      message: `${message}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alert.dismiss();
          },
        },
        {
          text: 'Retry',
          handler: () => {
            this.alert.dismiss();
            this.logIn();
          },
        },
      ],
    });

    await alert.present();
  }

  close = () => {
    this.modalCtrl.dismiss();
  }

  logIn() {
    this.presentLoading();
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.close();
          this.router.navigate(['general/main']);
        })
        .then(() => {
          this.loader.dismiss();
        })
        .catch((error) => {
          this.loginAlert(error.message).then(_ => {
            this.loader.dismiss();
          });
        }).finally(() => {
          return this.loader.dismiss();
        });
    }
  }

  forgotPassword() {
    const user = this.fireAuth.currentUser;
    // this.actvRoute.params.subscribe(resp => {
    //   console.log('Route Parameter: ', resp);
    // });
    // this.fireAuth.sendPasswordResetEmail().then(_ => {
    //   console
    // })
  }
}
