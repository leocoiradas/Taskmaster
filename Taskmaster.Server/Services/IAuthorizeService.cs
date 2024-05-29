using Taskmaster.Server.Models.JWTAdminClasses;

namespace Taskmaster.Server.Services

{
    public interface IAuthorizeService
    {
        Task <AuthorizeResponse> GetToken (AuthorizeRequest request);
    }
}
