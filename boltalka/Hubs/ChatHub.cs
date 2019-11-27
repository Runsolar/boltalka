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
        public async Task _newMessageFromClient(IncomingMessage inMessage)
        {
            OutboundMessage outMessage = new OutboundMessage();
            outMessage.message = inMessage.message;
            await Clients.All.SendAsync("broadcastMessageReceived", outMessage);
        }
    }
}
