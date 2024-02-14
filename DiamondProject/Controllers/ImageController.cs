using DiamondProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageServices _imageServices;

        public ImageController(ImageServices imageServices)
        {
            _imageServices = imageServices;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetImage(string name)
        {
            var stream = await _imageServices.GetImageAsync(name);
            return File(stream, "image/png");
        }
    }
}
