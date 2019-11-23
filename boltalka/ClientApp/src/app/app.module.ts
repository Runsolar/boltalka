import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoltalkaComponent } from './boltalka.component';
import { SenderComponent } from './sender.component';

@NgModule({
    declarations: [
        AppComponent,
        BoltalkaComponent,
        SenderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
