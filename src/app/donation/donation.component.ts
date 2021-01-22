import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {

  constructor(private clip: Clipboard, private toastCtrl: ToastController) { }

  ngOnInit() {}

  copyAccountNumber(acctNumber) {
    this.clip.copy(acctNumber).then(() => {
      this.presentToast();
    });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Account Number Copied!',
      position: 'bottom',
      duration: 3000
    });

    await toast.present();
  }

}
