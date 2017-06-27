import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
    selector: 'app-observable-topromise',
    templateUrl: './observable-topromise.component.html',
    styleUrls: ['./observable-topromise.component.css']
})
export class ObservableTopromiseComponent implements OnInit {

    private inputValue = '';
    private value;
    private valueObs;

    constructor() {
    }

    ngOnInit() {
        this.valueObs = this.firebaseObservableLike();

        this.valueObs.take(2).toPromise().then((value) => {
           this.value = value;
        });
    }

    firebaseObservableLike() {
        //This is not part of the tutorial
        let elem = document.getElementById('button');
        return Observable.fromEvent(elem, 'click').switchMap(() => {
            return Observable.of(this.inputValue);
        });
    }
}
