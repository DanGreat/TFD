import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { VideoPageComponent } from '../video-page/video-page.component';
import {
  StreamingMedia,
  StreamingVideoOptions,
} from '@ionic-native/streaming-media/ngx';
import { HttpServiceService } from '../service/http-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  isFavourite = 'star-outline';
  favourites = [];

  videoFeed;

  @ViewChildren('player') videoPlayers: QueryList<any>;
  currentPlaying = null;

  constructor(
    private videoPopup: ModalController,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private streamMedia: StreamingMedia,
    private alert: AlertController,
    private service: HttpServiceService
  ) {}

  ngOnInit() {
    this.platform
      .ready()
      .then(() => {
        this.presentLoading().then(() => {
          this.fetchStreams();
        });
      })
      .catch((err) => {
        console.error('Platform not ready to display streams', err);
      });
  }

  fetchStreams() {
    this.service.fetchVideos().subscribe(
      (res) => {
        this.videoFeed = res.videos;
        if (this.videoFeed.length > 0) {
          this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);
        }
      },
      (error) => {
        this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);
        this.alertMsg('Please check your network connection!')
      }
    );
  }

  didScroll() {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) {
      return;
    } else if (
      this.currentPlaying &&
      !this.isElementInViewport(this.currentPlaying)
    ) {
      // Item is out of view, pause it
      this.currentPlaying.pause();
      this.currentPlaying = null;
    }

    this.videoPlayers.forEach((player) => {
      if (this.currentPlaying) {
        return;
      }
      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      if (inView) {
        this.currentPlaying = nativeElement;
        // this.currentPlaying.muted = true;
        this.currentPlaying.play();
      }
    });
  }

  watchSermon = (source) => {
    const videoOption: StreamingVideoOptions = {
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true,
      successCallback: () => this.presentToast('Stream Successful'),
      errorCallback: () => this.presentToast('Stream Failed'),
    };
    this.streamMedia.playVideo(source, videoOption);
    // this.sermonModal();
  };

  async sermonModal() {
    const modal = await this.videoPopup.create({
      component: VideoPageComponent,
      animated: true,
      componentProps: {
        videoId: 'Douglas',
        videoUrl: 'Adams',
        sermon: 'N',
      },
    });
    return await modal.present();
  }

  toggleFavourite(passedId) {
    if (this.isFavourite === 'star') {
      // remove from favourites
      this.isFavourite = 'star-outline';
      // this.favourites = this.favourites.filter((item) => item !== passedId);
      // TODO save in native storage
    } else {
      // add to favourites
      this.isFavourite = 'star';
      this.favourites.push(1);
      this.favourites.filter((item, i, arr) => arr.indexOf(item) === i);
      // TODO save in native storage
      console.log('Favourites: ', this.favourites);
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Fetching Streams...',
      spinner: 'crescent',
      backdropDismiss: false,
      showBackdrop: false,
    });

    await loading.present();
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: `${message}`,
      position: 'bottom',
      duration: 4000,
    });

    await toast.present();
  }

  async alertMsg(message) {
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
            this.fetchStreams();
          },
        },
      ],
    });

    await alert.present();
  }
  
  // moreSermons(event: any) {
  //   this.service.fetchVideos().subscribe(res => {
  //     const more: any = Array<any>(res['data']);
  //     for (const sermon of more) {
  //       this.videoFeed.push(sermon);
  //       console.log('Pushed', this.videoFeed);
  //     }
  //     event.target.complete();
  //   }, (error) => {
  //     console.log('Error: ', error);
  //     this.presentToast('Check Network Connection!');
  //   });

  // }
}
