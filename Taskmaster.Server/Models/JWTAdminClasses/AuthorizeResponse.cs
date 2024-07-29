using Taskmaster.Server.DTO;

namespace Taskmaster.Server.Models.JWTAdminClasses
{
    public class AuthorizeResponse
    {
        public string Token { get; set; }
        public EmployeeDTO User {  get; set; }
        public bool  Success { get; set; }
        public string Message { get; set; }
    }
}
