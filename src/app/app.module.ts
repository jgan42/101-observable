import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ObservableSimpleComponent} from './observable-simple/observable-simple.component';
import {ObservableSwitchMapComponent} from "./observable-switchmap/observable-switchmap.component";
import {ObservableCombineLatestComponent} from "./observable-combinelatest/observable-combinelatest.component";
import {RouterModule, Routes} from "@angular/router";
import {ObservableTopromiseComponent} from './observable-topromise/observable-topromise.component';

const appRoutes: Routes = [
    {path: 'simple', component: ObservableSimpleComponent},
    {path: 'topromise', component: ObservableTopromiseComponent},
    {path: 'switchmap', component: ObservableSwitchMapComponent},
    {path: 'combinelatest', component: ObservableCombineLatestComponent},
    {path: '', redirectTo: '/simple', pathMatch: 'full'},
];

@NgModule({
    declarations: [
        AppComponent,
        ObservableSimpleComponent,
        ObservableSwitchMapComponent,
        ObservableCombineLatestComponent,
        ObservableTopromiseComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
