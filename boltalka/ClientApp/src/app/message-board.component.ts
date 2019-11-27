import { Component, OnInit } from '@angular/core';
import { OutboundMessage } from './outbound-message.model';
import { IncomingMessage } from "./incoming-message.model";
import { User } from './user.model';
import { TransportService } from './transport.service';


@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css']
})
export class MessageBoardComponent {

    myId: number = 0;
    myGid: number = 0;
    myConnectionId: string;
    auth: boolean = false;

    usersonline: Array<User>;
    messages: Array<IncomingMessage>;
    showRegistrationDialog: boolean = false;

    apptransport: TransportService ;
    constructor(private _apptransport: TransportService ) {
        this.apptransport = _apptransport;
        this.messages = _apptransport.incomingmessages;
        //this.subscribeToEventsFromTransport();
    };

    deleteMsg = function (msgId: string): void {
        if ((msgId.length < 32) && (this.myGid === 10)) {
            this.apptransport.sendServicesMsgOnServer(3, msgId);
        }
    };

    // подписываемся к событиям сервера
    private subscribeToEventsFromTransport(): void {
        let self: MessageBoardComponent = this;

        // получаем событие об успешной авторизации
/*
        self._apptransport.onUserIsLoggedInAndAuth.subscribe((ImAuth: boolean) => {
            if (ImAuth) {
                self.myId = self.apptransport.myId;
                self.myGid = self.apptransport.myGid;
                self.myConnectionId = self.apptransport.myConnectionId;
                self.auth = self.apptransport.myAuth;
            }
        });
        */
    }

}
