import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable-combinelatest',
  templateUrl: './observable-combinelatest.component.html',
  styleUrls: ['./observable-combinelatest.component.css']
})
export class ObservableCombineLatestComponent implements OnInit, OnDestroy {

  private mainInputValue = ['', '', '', ''];
  private mainValue;
  private mainValueObs;
  private inputValue = [];
  private dependantValue;
  private dependantValueObs;
  private dependantValueSub;

  constructor() { }

  ngOnInit() {
    this.mainValueObs = this.firebaseObservableListLike();
    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    this.dependantValueSub = this.mainValueObs.switchMap((values) => {
      console.log('NEXT MAIN values', values);
      this.mainValue = values;

      let obsArray = values.map((value) => {
        if (value == '0' || value == '1' || value == '2' || value == '3') {
          return this.firebaseObservableLike(value);
        }
        return Observable.of(value);
      });

      this.dependantValueObs = Observable.combineLatest(...obsArray);

      return this.dependantValueObs;
    }).subscribe((values) => {
      console.log('NEXT DEPENDANT values', values);
      this.dependantValue = values;
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

  firebaseObservableListLike() {
    //This is not part of the tutorial
    let elem = document.getElementById('main-button');
    return Observable.fromEvent(elem, 'click').switchMap(() => {
      return Observable.of(this.mainInputValue);
    });
  }

}
