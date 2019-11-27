using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boltalka.Models
{
    public class OutboundMessage
    {
        public int senderId { get; set; }
        public int receiverId { get; set; }
        public bool prvMsg { get; set; }
        public string msgId { get; set; }
        public string time { get; set; }
        public string senderNickName { get; set; }
        public string senderNickColor { get; set; }
        public string receiverNickName { get; set; }
        public string receiverNickColor { get; set; }
        public string msgColor { get; set; }
        public string message { get; set; }
    }
}
