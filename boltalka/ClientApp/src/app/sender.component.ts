import { Component, OnInit, Input, Injectable } from '@angular/core';
import { OutboundMessage } from './outbound-message.model';
import { TransportService } from './transport.service';
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

    apptransport: TransportService;
    constructor(private _apptransport: TransportService) {
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
            this.apptransport.sendAuthDataOnServer(this.userName, this.userPassword);
        }
    }

    //Отправка сообщения
    onClickSendMsg = function (): number {

        let newOutboundMessage: OutboundMessage = new OutboundMessage();

        if (this.msg.length == 0) return -1;

        newOutboundMessage.connectionId = this.myConnectionId;
        newOutboundMessage.receiverId = 0;
        //Пользовательское сообщение
        newOutboundMessage.instruction = 0;

        if (this.msg.length > this.maxmsglength)
            newOutboundMessage.message = this.msg.substr(0, this.maxmsglength);
        else newOutboundMessage.message = this.msg;

        if (this.users.find((obj: User) => obj.selectedAsRecipient === true) == undefined)
            newOutboundMessage.receiverId = 0;
        else
            newOutboundMessage.receiverId = this.users.find((obj: User) => obj.selectedAsRecipient === true).userid;

        newOutboundMessage.prvMsg = this.prvMsg;

        this._apptransport.sendMsgOnServer(newOutboundMessage);

        this.msg = '';
        this.msglimit = this.maxmsglength;

        return 0;
    }

    //Подписываемся к событиям сервера
    private subscribeToEventsFromTransport(): void {
        let self = this;

        //Получаем событие об успешной авторизации
        self.apptransport.onUserIsLoggedInAndAuth.subscribe((imAuth: boolean) => {
            self.myId = self.apptransport.myId;
            self.myGid = self.apptransport.myGid;
            self.auth = imAuth;
            self.myConnectionId = self.apptransport.myConnectionId;
        });
      
    }

}
