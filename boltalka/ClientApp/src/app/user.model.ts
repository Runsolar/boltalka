export class User {
    userid: number;
    userGid: number;
    room: number;
    email: string;
    registrationDate: string;
    connectionId: string;
    nickName: string;
    nickColor: string;
    msgColor: string;
    selectedAsRecipient: boolean = false;
    itsMe: boolean = false;
    banned: boolean = false;
    prisoner: boolean = false;
    password: string;
}
