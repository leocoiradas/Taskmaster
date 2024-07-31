using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Taskmaster.Server.Models;
using Taskmaster.Server.Models.JWTAdminClasses;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Taskmaster.Server.DTO;

namespace Taskmaster.Server.Services
{
    public class AuthorizeService(TaskmasterContext dbcontext, IConfiguration configuration) : IAuthorizeService
    {
        private readonly TaskmasterContext _dbcontext = dbcontext;
        private readonly IConfiguration _configuration = configuration;

        private string GenerateToken(Employee user)
        {
            var tokenKey = _configuration.GetSection("JwtSettings").GetSection("key").ToString();
            var keyBytes = Encoding.ASCII.GetBytes(tokenKey);
            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Email));
            claims.AddClaim(new Claim(ClaimTypes.Role, user.Role ));

            var TokenCredential = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature);
            var TokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = TokenCredential
            };

            var TokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = TokenHandler.CreateToken(TokenDescriptor);
            string createdToken = TokenHandler.WriteToken(tokenConfig);

            return createdToken;
        }

        public async Task<AuthorizeResponse> GetToken(AuthorizeRequest request)
        {

            try
            {
                var userFound = _dbcontext.Employees.FirstOrDefault(x => x.Email == request.Email);
                if (userFound == null || !BCrypt.Net.BCrypt.Verify(request.Password, userFound.Password))
                {
                    return await Task.FromResult<AuthorizeResponse>(null);
                }
                string createdToken = GenerateToken(userFound);

                EmployeeDTO employeeDTO = new EmployeeDTO{
                    EmployeeId = userFound.Id,
                    Name = userFound.FirstName,
                    LastName = userFound.LastName,
                    Email = userFound.Email,
                    Role = userFound.Role,
                };

                return new AuthorizeResponse() { Token = createdToken, User = employeeDTO , Success = true, Message = "Token received successfully" };
            }
            catch (Exception error)
            {

                Console.WriteLine(error);

                return new AuthorizeResponse { Success = false, Message = "Error while proccessing the request" };
            }
        }
    }
}
