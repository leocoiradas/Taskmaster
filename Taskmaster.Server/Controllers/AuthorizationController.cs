using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Taskmaster.Server.Models.JWTAdminClasses;
using Taskmaster.Server.Services;

namespace Taskmaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController(IAuthorizeService authorizeService) : ControllerBase
    {
        private readonly IAuthorizeService _authorizeService = authorizeService;

        [HttpPost]
        [Route("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthorizeRequest request)
        {
            var authorizeResult = await _authorizeService.GetToken(request);
            if (authorizeResult == null)
            {
                return Unauthorized();
            }
            return Ok(authorizeResult);
        }
    }

}
