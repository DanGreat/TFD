import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
})
export class VideoPageComponent implements OnInit {

  @Input() videoId;
  @Input() videoUrl;
  @Input() sermon;

  constructor(private modal: ModalController) { }

  ngOnInit() {}

  dismissVideo = () => {
    this.modal.dismiss();
  }
}
