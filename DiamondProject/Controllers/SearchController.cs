using DiamondProject.Models.Model;
using DiamondProject.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiamondProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ApiBaseController
    {
        private readonly RingServices _ringServices;

        public SearchController(RingServices ringServices)
        {
            _ringServices = ringServices;
        }

        [HttpGet("{keyword}")]
        public async Task<IActionResult> Get([FromRoute] string keyword)
        {
            var results = new List<SearchResutItem>();

            var ringResults = await _ringServices.FindRingByNameAsync(keyword);
            foreach (var ringResult in ringResults)
            {
                var result = new SearchResutItem()
                {
                    Id = ringResult.RingId,
                    ImageName = ringResult.Images.FirstOrDefault().Path,
                    Name = ringResult.RingName,
                    MadeIn = ringResult.MadeIn,
                    Material = ringResult.Material,
                    PathName = ringResult.PathName,
                    Price = ringResult.Price,
                };
                results.Add(result);
            }

            return Ok(results);
        }
    }
}
