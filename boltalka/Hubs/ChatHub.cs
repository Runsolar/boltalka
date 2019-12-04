using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using boltalka.Models;

namespace boltalka.Hubs
{
    public class ChatHub : Hub
    {
        //База пользователей
        static List<User> users = new List<User>()
        {
            new User { userid = 0, userGid = 0, nickName = "Doorman", nickColor="#ffffff", msgColor="#ffffff", selectedAsRecipient = false, itsMe = false, banned=false, password="1"},
            new User { userid=100, userGid=80, nickName= "Вася", nickColor= "#ff0000", msgColor= "#ff0000", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 200, userGid= 80, nickName= "Петя", nickColor= "#00ff00", msgColor= "#00ff00", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 300, userGid= 80, nickName= "Дима", nickColor= "#ffff00", msgColor= "#ffff00", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 400, userGid= 80, nickName= "Саша", nickColor= "#996633", msgColor= "#996633", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 500, userGid= 80, nickName= "Маша", nickColor= "#9900cc", msgColor= "#9900cc", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 600, userGid= 80, nickName= "Нина", nickColor= "#ff0066", msgColor= "#ff0066", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 700, userGid=80, nickName= "Даша", nickColor= "#66ccff", msgColor= "#66ccff", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 800, userGid= 80, nickName="Никита", nickColor= "#ffffff", msgColor="#ffffff", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 900, userGid= 10, nickName="Администратор", nickColor= "#ffffff", msgColor="#ffffff", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            new User { userid= 901, userGid= 10, nickName="8888888888888", nickColor= "#ffffff", msgColor="#ffffff", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" }
        };


        //Кто онлайн
        static List<User> usersOnline = new List<User>()
        {
            new User { userid = 0, userGid = 0, nickName = "Doorman", nickColor="#ffffff", msgColor="#ffffff",
                selectedAsRecipient = false, itsMe = false, banned=false, password="", connectionId="Doorman-0000-0110-0000-100000000001"},
            //new User { userid=100, userGid=80, nickName= "Вася", nickColor= "#ff0000", msgColor= "#ff0000", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 200, userGid= 80, nickName= "Петя", nickColor= "#00ff00", msgColor= "#00ff00", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 300, userGid= 80, nickName= "Дима", nickColor= "#ffff00", msgColor= "#ffff00", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 400, userGid= 80, nickName= "Саша", nickColor= "#996633", msgColor= "#996633", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 500, userGid= 80, nickName= "Маша", nickColor= "#9900cc", msgColor= "#9900cc", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 600, userGid= 80, nickName= "Нина", nickColor= "#ff0066", msgColor= "#ff0066", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" },
            //new User { userid= 700, userGid=80, nickName= "Даша", nickColor= "#66ccff", msgColor= "#66ccff", selectedAsRecipient = false, itsMe = false, banned=false, password= "1" }
        };

        //Коллекция для хранения последних N сообщений
        static int MAXLASTOUTMSG = 64;
        static List<OutboundMessage> lastOutboundMessages = new List<OutboundMessage>(MAXLASTOUTMSG);

        public async Task _newMessageFromClient(IncomingMessage inMessage)
        {
            User sender = usersOnline.FirstOrDefault(u => u.connectionId == inMessage.connectionId);
            User receiver = usersOnline.FirstOrDefault(u => u.userid == inMessage.receiverId);

            OutboundMessage outMessage = new OutboundMessage();

            if (inMessage.instruction == 0)
            {
                outMessage.msgId = sender.nickName + DateTime.Now.ToString("yyyyMMddHHmmss");
                outMessage.senderId = sender.userid;
                outMessage.time = DateTime.Now.ToString("hh:mm");
                outMessage.senderNickName = sender.nickName;
                outMessage.senderNickColor = sender.nickColor;

                outMessage.receiverId = receiver.userid;
                outMessage.receiverNickName = receiver.nickName;
                outMessage.receiverNickColor = receiver.nickColor;

                outMessage.prvMsg = inMessage.prvMsg;
                outMessage.msgColor = sender.msgColor;
                outMessage.message = inMessage.message;


                if (!outMessage.prvMsg)
                {
                    if (lastOutboundMessages.Count < MAXLASTOUTMSG) lastOutboundMessages.Add(outMessage);
                    else
                    {
                        for (int i = 0; i < MAXLASTOUTMSG - 1; i++)
                        {
                            lastOutboundMessages[i] = lastOutboundMessages[i + 1];
                        }
                        lastOutboundMessages[MAXLASTOUTMSG - 1] = outMessage;
                    }
                }

                if (outMessage.prvMsg)
                {
                    //Clients.Caller.addMessage(outMessage);
                    await Clients.Caller.SendAsync("addMessage", outMessage);
                    if (sender.connectionId != receiver.connectionId)
                        //Clients.Client(Receiver.ConnectionId).addMessage(outMessage);
                        await Clients.Client(receiver.connectionId).SendAsync("addMessage", outMessage);
                }
                else
                {
                    //Clients.All.broadcastMessage(outMessage);
                    await Clients.All.SendAsync("broadcastMessageReceived", outMessage);
                }
            }

            return;

        }

        // Подключение нового пользователя
        public async Task connect(string userName, string userPassword)
        {
            User user = users.FirstOrDefault(u => u.nickName == userName && u.password == userPassword);
            var connectionId = Context.ConnectionId;

            if (user == null)
            {
                //Отпрвляем кто онлайн
                await Clients.Caller.SendAsync("onConnectedUsersOnlineList", usersOnline);
                //Отправляем список последних сообщений
                await Clients.Caller.SendAsync("onConnectedLastOutboundMessages", lastOutboundMessages);
                return;
            }
            else if (user.banned == true)
            {
                return;
            }
            else if (usersOnline.Any(x => x.connectionId == connectionId))
            {
                return;
            }
            else if (usersOnline.Any(x => x.nickName == users.FirstOrDefault(u => u.nickName == userName).nickName))
            {
                return;
            }
            else
            {
                User newUser = new User()
                {
                    connectionId = connectionId,
                    userid = user.userid,
                    userGid = user.userGid,
                    nickName = user.nickName,
                    nickColor = user.nickColor,
                    msgColor = user.msgColor,
                    password = ""
                };

                //Добавляем нового пользователя в юзерлист
                usersOnline.Add(newUser);

                // Посылаем сообщение текущему пользователю об его авторизации
                await Clients.Caller.SendAsync("onConnectedUserIsLoggedIn", newUser);

                //ID соединения отправляем только владельцу
                newUser.connectionId = null;
                // Посылаем сообщение всем пользователям, кроме текущего
                await Clients.AllExcept(connectionId).SendAsync("onNewUserConnected", newUser);
                newUser.connectionId = connectionId;

                //Пользователь зашел в ЧАТ
                IncomingMessage inMessage = new IncomingMessage();
                inMessage.connectionId = usersOnline.FirstOrDefault(x => x.nickName == "Doorman").connectionId;
                inMessage.receiverId = 0;
                inMessage.message = newUser.nickName + ", welcome to the Boltalka!";
                inMessage.prvMsg = false;
                await _newMessageFromClient(inMessage);
            }

            return;
        }

    }
}
