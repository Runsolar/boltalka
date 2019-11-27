using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boltalka.Models
{
    public class IncomingMessage
    {
        public string connectionId { get; set; }
        public int? receiverId { get; set; }
        public bool prvMsg { get; set; }
        public int instruction { get; set; }
        public string message { get; set; }
    }
}
