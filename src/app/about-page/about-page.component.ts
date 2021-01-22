import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  close = () => {
    this.modal.dismiss();
  }
}
