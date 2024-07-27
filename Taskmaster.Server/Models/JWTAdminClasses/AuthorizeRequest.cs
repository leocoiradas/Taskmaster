namespace Taskmaster.Server.Models.JWTAdminClasses
{
    public class AuthorizeRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
