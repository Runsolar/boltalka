import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

//import { AppComponent } from './app.component';
import { TransportService } from './transport.service';
import { BoltalkaComponent } from './boltalka.component';
import { SenderComponent } from './sender.component';
import { MessageBoardComponent } from './message-board.component';
import { UsersOnlineComponent } from './users-online.component';

@NgModule({
    declarations: [
        //AppComponent,
        BoltalkaComponent,
        MessageBoardComponent,
        SenderComponent,
        UsersOnlineComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        TransportService
    ],
    bootstrap: [BoltalkaComponent]
})
export class AppModule { }
