import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { User } from "./user.model";
import { IncomingMessage } from './incoming-message.model';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

@Injectable({
  providedIn: 'root'
})
export class TransportService {
    // online list
    usersonline: Array<User>;
    // offline list
    usersoffline: Array<User>;
    incomingmessage: Array<IncomingMessage>;
    public connectionExists: Boolean;

    constructor() { }

    // Event handlers from the server
    private registerOnServerEvents(): void {
        let self: TransportService = this;

        connection.on("onConnectedUsersOnlineList", (usersonline: Array<User>) => {
            this.clearUserList();
            usersonline.map(u => self.addUserInUsersList(u));
        });
    }

    clearUserList = (): void => {
        for (let n: number = this.usersonline.length; n > 0; n--) {
            this.usersonline.pop();
        }
    }

    addUserInUsersList = (useronline: User): void => {
        this.usersonline.push(useronline);
        //this.ChangeUsersCount.emit(this.usersonline.length);
    }

    private startConnection = (): void => {
        connection.start().catch(function (err) {
            return console.error(err.toString());
        });
    }
}
