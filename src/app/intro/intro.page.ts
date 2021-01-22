import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { ModalController } from '@ionic/angular';
import { SignupComponentComponent } from '../signup-component/signup-component.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController, private auth: AngularFireAuth) { }

  ngOnInit() {

  }


  async signUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignupComponentComponent,
    });
    return await modal.present();
  }

  async loginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponentComponent,
    });
    return await modal.present();
  }


  // signupWithGoogle() {
  //   const provider = this.auth.

  // }
}
