import { Component, OnInit, Input, Injectable } from '@angular/core';

import { OutboundMessage } from './outbound-message.model';
import { User } from './user.model';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})

@Injectable()
export class SenderComponent implements OnInit {

    myId: number = 0;
    myGid: number = 0;
    auth: boolean = false;
    myConnectionId: string;

    userName: string = '';
    userPassword: string = '';

    //Событие
    onClickSendAuthEvent: number = 0;
    msg: string = '';

    msglimit: number = 255;
    maxmsglength: number = 255;

    prvMsg: boolean = false;

    users: Array<User>;

    apptransport: AppTransport;
    constructor(private _apptransport: AppTransport) {
        this.apptransport = _apptransport;
        this.users = _apptransport.usersonline;
        this.subscribeToEventsFromTransport();
    }

    ngOnInit() {
    }

    onKey(event: any) { // without type info
        if (this.msglimit > 0) this.msglimit = this.maxmsglength - this.msg.length;
    }
    /*
        SmileClickedEventFromBoltalka = function(smileid: string): void {
            alert(smileid);
        }
    */
    onClickSendAuth = function (): void {
        if ((this.userName.length) > 0 && (this.userPassword.length > 0)) {
            this.apptransport.server.connect(this.userName, this.userPassword);
        }
    }

    //Отправка сообщения
    onClickSendMsg = function (): number {

        let NewOutboundMessage: OutboundMessage = new OutboundMessage();

        if (this.msg.length == 0) return -1;

        NewOutboundMessage.connectionId = this.MyConnectionId;
        NewOutboundMessage.receiverId = 0;
        //Пользовательское сообщение
        NewOutboundMessage.instruction = 0;

        if (this.msg.length > this.maxmsglength)
            NewOutboundMessage.message = this.msg.substr(0, this.maxmsglength);
        else NewOutboundMessage.message = this.msg;

        if (this.users.find((obj: User) => obj.SelectedAsRecipient === true) == undefined)
            NewOutboundMessage.receiverId = 0;
        else
            NewOutboundMessage.receiverId = this.users.find((obj: User) => obj.SelectedAsRecipient === true).userid;

        NewOutboundMessage.prvMsg = this.prvMsg;

        this._apptransport.sendMsgOnServer(NewOutboundMessage);

        this.msg = '';
        this.msglimit = this.maxmsglength;

        return 0;
    }

    //Подписываемся к событиям сервера
    private subscribeToEventsFromTransport(): void {
        let self = this;

        //Получаем событие об успешной авторизации
        self.apptransport.onUserIsLoggedInAndAuth.subscribe((ImAuth: boolean) => {
            self.myId = self.apptransport.MyId;
            self.myGid = self.apptransport.MyGid;
            self.auth = ImAuth;
            self.myConnectionId = self.apptransport.MyConnectionId;
        });
    }

}
