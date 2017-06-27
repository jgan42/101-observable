import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-observable-simple',
  templateUrl: './observable-simple.component.html',
  styleUrls: ['./observable-simple.component.css']
})
export class ObservableSimpleComponent implements OnInit, OnDestroy {

  private inputValue = '';
  private value = {};
  private valueObs;
  private valueSub;

  constructor() { }

  ngOnInit() {
    this.valueObs = this.firebaseObservableLike();
    this.subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribe() {
    this.valueSub = this.valueObs.subscribe((value) => { //On Next value function
      console.log('NEXT value', value);
      this.value = value;
    }, (error) => { //Optionnal error function
      console.log('error', error);
    }, () => { //Optionnal complete function
      console.log('COMPLETED');
    });
  }

  unsubscribe() {
    this.valueSub.unsubscribe();
  }

  firebaseObservableLike() {
    //This is not part of the tutorial
    let elem = document.getElementById('button');
    return Observable.fromEvent(elem, 'click').switchMap(() => {
      return Observable.of({value: this.inputValue});
    });
  }

}
