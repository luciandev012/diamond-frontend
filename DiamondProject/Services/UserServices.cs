using DiamondProject.Models.InputModel;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net;

namespace DiamondProject.Services
{
    public class UserServices
    {
        private readonly IConfiguration _configuration;
        private readonly string USERNAME = "admin";
        private readonly string PASSWORD_HASH = "$2a$11$BUVsu0S9RYBcX0ShRLrZPuaCZIz1gF9BPff4DcPNSJIU2.Jhy8xkG";
        //private readonly string PASSWORD = "ngad23#@";

        public UserServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public UserDTO Register(UserDTO request)
        {
            var hashPassword = BC.BCrypt.HashPassword(request.Password);
            return new UserDTO() { Username = request.Username, Password = hashPassword };
        }
        public bool Login(UserDTO request, out string token)
        {
            var passwordCmp = BC.BCrypt.Verify(request.Password, PASSWORD_HASH);
            if(request.Username == USERNAME && passwordCmp) 
            {
                List<Claim> claims = new List<Claim>() 
                {
                    new Claim(ClaimTypes.Name, request.Username)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Key").Value));

                var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                var jwtToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: cred);

                token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

                return true;
            }
            else
            {
                token = null;
                return false;
            }
        }
    }
}
