using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boltalka.Models
{
    public class User
    {
        public int userid { get; set; }
        public int userGid { get; set; }
        public int room { get; set; }
        public string email { get; set; }
        public string registrationDate { get; set; }
        public string connectionId { get; set; }
        public string nickName { get; set; }
        public string nickColor { get; set; }
        public string msgColor { get; set; }
        public bool selectedAsRecipient { get; set; }
        public bool itsMe { get; set; }
        public bool banned { get; set; }
        public bool prisoner { get; set; }
        public string password { get; set; }
    }
}
