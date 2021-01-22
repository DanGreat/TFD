import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  constructor(private streamMedia: StreamingMedia) { }

  videoOption: StreamingVideoOptions = {
    orientation: 'landscape',
    shouldAutoClose: true,
    controls: true,
    successCallback: () => console.log('Stream Successfull'),
    errorCallback: () => console.log('Stream Failed'),
  };


  ngOnInit() {
    // this.streamMedia.playVideo('', this.videoOption);
  }


}
