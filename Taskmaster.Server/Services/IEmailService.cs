using Microsoft.AspNetCore.Mvc;

namespace Taskmaster.Server.Services
{
    public interface IEmailService
    {
        void SendEmailAsync(string email, string password);
    }
}
