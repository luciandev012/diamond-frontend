using DiamondProject.Models.InputModel;
using DiamondProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;
        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserDTO request)
        {
            var user = _userServices.Register(request);
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO request)
        {
            var res = _userServices.Login(request, out string token);

            if (res)
            {
                return Ok(token);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
