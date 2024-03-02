using System;
using DiamondProject.Models.InputModel;
using DiamondProject.Services;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
	public class RingBrandController : ApiBaseController
	{
		private readonly RingBrandServices _ringBrandServices;
		public RingBrandController(RingBrandServices ringBrandServices)
		{
			_ringBrandServices = ringBrandServices;
		}

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
		[HttpDelete("brand/{id}")]
		public async Task<IActionResult> DeleteBrandASync([FromRoute] Guid id)
		{
			var res = await _ringBrandServices.DeleteBrandAsync(id);
			return Ok();

		}
	}
}

