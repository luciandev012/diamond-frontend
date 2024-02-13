using DiamondProject.Models;
using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;

namespace DiamondProject.Services
{
    public class RingServices
    {
        private readonly DiamondDbContext _context;
        private readonly ImageServices _imageServices;
        public RingServices(DiamondDbContext context, ImageServices imageServices)
        {
            _context = context;
            _imageServices = imageServices;
        }
        public async Task<List<Ring>> GetRingsAsync() => await _context.Rings.ToListAsync();

        public async Task<Ring> CreateRingAsync(RingDTO model)
        {
            var ringId = Guid.NewGuid();
            var ring = new Ring()
            {
                Id = ringId,
                RingName = model.RingName,
                Price = model.Price,
                Quantity = model.Quantity,
                Resizable = model.Resizable,
                Size = model.Size,
                Material = model.Material,
                RingDescription = model.RingDescription,
                MadeIn = model.MadeIn,
                CategoryId = model.CategoryId
            };
            var listImage = new List<Image>();
            foreach (var item in model.Images)
            {
                var image = new Image()
                {
                    Id = Guid.NewGuid(),
                    Name = item.Name,
                    Path = await _imageServices.SaveFileAsync(item),
                    RingId = ringId
                };
                listImage.Add(image);
            }
            await _context.Rings.AddAsync(ring);
            //await _context.Images.AddRangeAsync(listImage);
            await _context.SaveChangesAsync();
            return ring;
        }

    }
}
