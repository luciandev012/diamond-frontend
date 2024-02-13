using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using DiamondProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RingController : ControllerBase
    {
        private readonly RingServices _ringServices;
        private readonly RingCategoryServices _ringCategoryServices;

        public RingController(RingServices ringServices, RingCategoryServices ringCategoryServices)
        {
            _ringServices = ringServices;
            _ringCategoryServices = ringCategoryServices;
        }

        [HttpGet]
        public async Task<List<Ring>> GetRings() => await _ringServices.GetRingsAsync();
        [HttpGet("ring-category")]
        public async Task<List<RingCategory>> GetRingCategories() => await _ringCategoryServices.GetRingCategoriesAsync();
        [HttpPost]
        public async Task<IActionResult> PostRing([FromForm]RingDTO model)
        {
            var result = await _ringServices.CreateRingAsync(model);
            return CreatedAtAction(nameof(PostRing), result);
        }
        [HttpPost("ring-category")]
        public async Task<IActionResult> PostRingCategory(RingCategoryDTO model)
        {
            await _ringCategoryServices.CreateRingCategoryAsync(model);
            return Ok();
        }
    }
}
