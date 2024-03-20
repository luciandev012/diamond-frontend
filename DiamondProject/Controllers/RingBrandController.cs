using System;
using DiamondProject.Models.InputModel;
using DiamondProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
	[Authorize]
	public class RingBrandController : ApiBaseController
	{
		private readonly RingBrandServices _ringBrandServices;
		public RingBrandController(RingBrandServices ringBrandServices)
		{
			_ringBrandServices = ringBrandServices;
		}
		[AllowAnonymous]
		[HttpGet("brand")]
		public async Task<IActionResult> GetBrandsAsync()
		{
			var res = await _ringBrandServices.GetBrandsAsync();
			return Ok(res);
		}
		[HttpPost("brand")]
		public async Task<IActionResult> CreateBrandAsync([FromBody] BrandDTO model)
		{
			var res = await _ringBrandServices.CreateBrandAsync(model);
			return Ok(res);
		}
		[HttpPut("brand/{id}")]
		public async Task<IActionResult> UpdateBrandAsync([FromRoute] Guid id, [FromBody] BrandDTO model)
		{
			var res = await _ringBrandServices.UpdateBrandAsync(id, model);
			if(res == null)
			{
				return StatusCode(204);
			}
			return Ok(res);
		}
		[HttpDelete("brand/{id}")]
		public async Task<IActionResult> DeleteBrandASync([FromRoute] Guid id)
		{
			var res = await _ringBrandServices.DeleteBrandAsync(id);
			return Ok();

		}
	}
}

