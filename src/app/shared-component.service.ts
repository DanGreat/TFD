import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  private themeSource = new Subject<boolean>();
  theme$ = this.themeSource.asObservable();
  constructor() { }

  setTheme(themeValue) {
    this.themeSource.next(themeValue);
  }
}
