import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable-switchmap',
  templateUrl: './observable-switchmap.component.html',
  styleUrls: ['./observable-switchmap.component.css']
})
export class ObservableSwitchMapComponent implements OnInit, OnDestroy {

  private inputValue = [];
  private mainValue;
  private mainValueObs;
  private dependantValue;
  private dependantValueObs;
  private dependantValueSub;

  constructor() { }

  ngOnInit() {
    this.mainValueObs = this.firebaseObservableLike(0);
    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    this.dependantValueSub = this.mainValueObs.switchMap((value) => {
      console.log('NEXT MAIN value', value);
      this.mainValue = value;

      this.dependantValueObs = this.firebaseObservableLike(value == 2 ? 2 : 1);
      return this.dependantValueObs;
    }).subscribe((value) => {
      console.log('NEXT DEPENDANT value', value);
      this.dependantValue = value;
    });
  }

  unsubscribe() {
    this.dependantValueSub.unsubscribe();
  }

  firebaseObservableLike(nb) {
    //This is not part of the tutorial
    let elem = document.getElementById('button-' + nb);
    return Observable.fromEvent(elem, 'click').switchMap(() => {
      return Observable.of(this.inputValue[nb]);
    });
  }

}
