
using MimeKit;
using System.Net;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Taskmaster.Server.Services
{
    public class EmailService : IEmailService
    {
        public async void SendEmailAsync(string email, string password)
        {
            try
            {
                string sender = "";
                string secretKey = "";

                MimeMessage newEmail = new MimeMessage();
                newEmail.From.Add(new MailboxAddress("Taskmaster Admin", sender));
                newEmail.To.Add(new MailboxAddress("Name", email));
                newEmail.Subject = "Welcome to Taskmaster!";

                BodyBuilder builder = new BodyBuilder()
                {
                    HtmlBody = $@"<div>
                                <h1>Welcome to Taskmaster!!</h1>
                            </div>"
                };

                newEmail.Body = builder.ToMessageBody();

                SmtpClient smtp = new SmtpClient();

                smtp.Connect("smtp.gmail.com", 587, false);
                smtp.Authenticate(sender, secretKey);
                await smtp.SendAsync(newEmail);
                smtp.Disconnect(true);


               
            }
            catch (Exception error)
            {

                Console.WriteLine(error.ToString());
            }

            
            



        }
        
    }
}
