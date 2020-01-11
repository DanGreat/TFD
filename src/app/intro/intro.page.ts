import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  splashScreen = true;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.splashScreen = false;
    }, 40000);
  }

  logIn() {
    this.router.navigate(['general/main']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }
}
