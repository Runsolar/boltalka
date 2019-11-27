import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

import { User } from "./user.model";
import { OutboundMessage } from "./outbound-message.model";
import { IncomingMessage } from "./incoming-message.model";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

@Injectable({
    providedIn: 'root'
})
export class TransportService {
    myConnectionId: string = "000000000000000000";

    // online list
    usersonline: Array<User>;
    // offline list
    usersoffline: Array<User>;
    incomingmessages: Array<IncomingMessage>;

    constructor() {
        this.usersonline = new Array<User>();
        this.incomingmessages = new Array<IncomingMessage>();
        this.registerOnServerEvents();
        this.startConnection(); // connecting to the Hub
    }

    private registerOnServerEvents(): void {
        let self: TransportService = this;

        connection.on("onConnectedUsersOnlineList", (usersonline: Array<User>): void => {
            self.clearUserList();
            usersonline.map(u => self.addUserInUserList(u));
        });

        // передаем список пользователей по запросу поиска
        connection.on("usersOfflineList", (usersoffline: Array<User>): void => {
            self.clearOfflineUserList();
            usersoffline.map(u => self.addUserInOfflineUserList(u));
        });

        // удаляем сообщение
        connection.on("deleteMsg", (msgId: string): void => {
            self.incomingmessages.splice(self.incomingmessages.findIndex(m => m.msgId === msgId), 1);
        });

        connection.on("broadcastMessageReceived", (newIncomingMessage: IncomingMessage) => {
            //console.log(newIncomingMessage.message);
            self.addIncomingMessageInPool(newIncomingMessage);
        });
    }

    /* Register of the client side functions */
    // добавляем сообщение от сервера в пул 
    addIncomingMessageInPool = (newIncomingMessage: IncomingMessage): void => {
        this.incomingmessages.push(newIncomingMessage);
    }

    addUserInUserList = (useronline: User): void => {
        this.usersonline.push(useronline);
        //this.ChangeUsersCount.emit(this.usersonline.length);
    }

    clearUserList = (): void => {
        for (let n: number = this.usersonline.length; n > 0; n--) {
            this.usersonline.pop();
        }
    }

    addUserInOfflineUserList = (useroffline: User): void => {
        this.usersoffline.push(useroffline);
    }

    clearOfflineUserList = (): void => {
        for (let n: number = this.usersoffline.length; n > 0; n--) {
            this.usersoffline.pop();
        }
    }

    // отправляем сообщение на сервер
    sendMsgOnServer = (newOutboundMessage: OutboundMessage): void => {
        connection.send("_newMessageFromClient", newOutboundMessage);
    }

    public sendServicesMsgOnServer = (instruction: number, message: string): void => {
        let newOutboundMessage: OutboundMessage = new OutboundMessage();
        newOutboundMessage.connectionId = this.myConnectionId;
        newOutboundMessage.receiverId = null;
        newOutboundMessage.instruction = instruction;
        newOutboundMessage.message = message;
        newOutboundMessage.prvMsg = false;
        this.sendMsgOnServer(newOutboundMessage);
    }

    private startConnection = (): void => {
        connection.start().catch(function (err) {
            return console.error(err.toString());
        });
    }
}
