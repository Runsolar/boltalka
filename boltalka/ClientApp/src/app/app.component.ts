import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";

const username = new Date().getTime();


const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private connection: any;

    title = 'ClientApp';
    messages: Array<string> = [
        'Dr Nice',
        'Narco',
        'Bombasto',
        'Celeritas',
        'Magneta',
        'RubberMan',
        'Dynama',
        'Dr IQ',
        'Magma',
        'Tornado'
    ];

    sendmessage: string;


    constructor() {

        connection.on("messageReceived", (username: string, receivemessage: string) => {
            this.messages.push(username + ': ' + receivemessage);
        });

        connection.start().catch(function (err) {
            return console.error(err.toString());
        });


    }
    //Receive message


    //Отправка сообщения
    onClickSendMsg = function (): void {
        connection.send("newMessage", username, this.sendmessage)
            .then(() => this.sendmessage = '');
    };

    private registerOnServerEvents(): void {

    }
}
