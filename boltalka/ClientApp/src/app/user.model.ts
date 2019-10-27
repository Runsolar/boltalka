export class User {
    userid: number;
    UserGid: number;
    Room: number;
    Email: string;
    RegistrationDate: string;
    ConnectionId: string;
    NickName: string;
    NickColor: string;
    MsgColor: string;
    SelectedAsRecipient: boolean = false;
    ItsMe: boolean = false;
    banned: boolean = false;
    prisoner: boolean = false;
    password: string;
}
