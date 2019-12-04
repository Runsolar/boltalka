import { Component, OnInit } from '@angular/core';
import { OutboundMessage } from './outbound-message.model';
import { IncomingMessage } from "./incoming-message.model";
import { User } from './user.model';
import { TransportService } from './transport.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css']
})
export class UsersOnlineComponent implements OnInit {

    myId: number = 0;
    myGid: number = 0;
    myConnectionId: string;
    auth: boolean = false;
    usersCount: number;

    usersonline: Array<User>;

    apptransport: TransportService;
    constructor(private _apptransport: TransportService) {
        this.apptransport = _apptransport;
        this.usersonline = _apptransport.usersonline;
        this.subscribeToEventsFromTransport();
    }

    ngOnInit() {

        this.apptransport.checkConnectionState();
    }

    ClkOnNickName = function (recieverNickName: string, recieverId: number): void {

        var divToChange: HTMLElement = document.getElementById(recieverNickName);

        if (divToChange.style.fontSize === "12px") {
            for (let n: number = 0; n < this.usersonline.length; n++) {
                document.getElementById(this.usersonline[n].nickName).style.fontSize = "12px";
                document.getElementById(this.usersonline[n].nickName).style.margin = "4px";
                document.getElementById(this.usersonline[n].nickName).style.textAlign = "left";
                if (this.usersonline[n].nickName === recieverNickName) {
                    this.usersonline[n].selectedAsRecipient = true;
                } else {
                    this.usersonline[n].selectedAsRecipient = false;
                }
            }

            divToChange.style.fontSize = "16px";
            // divToChange.style.marginLeft = '16px';
            divToChange.style.textAlign = "center";
        } else {
            for (let n: number = 0; n < this.usersonline.length; n++) {
                this.usersonline[n].SelectedAsRecipient = false;
            }
            divToChange.style.fontSize = "12px";
            divToChange.style.margin = "4px";
            divToChange.style.textAlign = "left";
        }

    };

    // подписываемся к событиям сервера
    private subscribeToEventsFromTransport = function (): void {
        let self: UsersOnlineComponent = this;
      /*
        // получаем события об изменении числа участников чата
        self.apptransport.changeUsersCount.subscribe((UsersCount: number) => {
            self.usersCount = UsersCount;
        });
*/
        // получаем событие об успешной авторизации
        self.apptransport.onUserIsLoggedInAndAuth.subscribe((imAuth: boolean) => {
            self.myId = self.apptransport.myId;
            self.myGid = self.apptransport.myGid;
            self.auth = imAuth;
            self.myConnectionId = self.apptransport.myConnectionId;
        });
       
    };

}
