﻿using DiamondProject.Models.InputModel;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRingById([FromRoute] Guid id)
        {
            var result = await _ringServices.GetRingByIdAsync(id);
            if(result == null)
            {
                return StatusCode(204);
            }
            return Ok(result);
        }

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
            var result = await _ringCategoryServices.CreateRingCategoryAsync(model);
            return CreatedAtAction(nameof(PostRingCategory), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRing([FromRoute] Guid id,[FromForm] RingDTO model)
        {
            var result = await _ringServices.UpdateRingAsync(id, model);
            if (result)
            {
                return Ok();
            }
            return StatusCode(204);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRing([FromRoute]Guid id)
        {
            await _ringServices.DeleteRingAsync(id);
            return Ok();
        }
        [HttpDelete("ring-category/{id}")]
        public async Task<IActionResult> DeleteRingCategory([FromRoute] Guid id)
        {
            await _ringCategoryServices.DeleteRingCategoryAsync(id);
            return Ok();
        }
        [HttpGet("ring-category/{id}")]
        public async Task<IActionResult> GetRingCategory(Guid id)
        {
            var result = await _ringCategoryServices.GetRingCategoryById(id);
            if (result == null)
            {
                return StatusCode(204);
            }
            return Ok(result);
        }
    }
}
