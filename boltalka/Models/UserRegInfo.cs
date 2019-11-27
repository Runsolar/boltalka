using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace boltalka.Models
{
    public class UserRegInfo
    {
        public string userNickName { get; set; }
        public string userPassword { get; set; }
        public string email { get; set; }
        public string selectedNickColorValue { get; set; }
        public string selectedMsgColorValue { get; set; }
    }
}
