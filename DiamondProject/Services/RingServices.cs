using DiamondProject.Common;
using DiamondProject.Models;
using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

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
        public async Task<List<Ring>> GetRingsAsync() => await _context.Rings.Include(x => x.Images).ToListAsync();

        public async Task<Ring> CreateRingAsync(RingDTO model)
        {
            var ringId = Guid.NewGuid();
            var ring = new Ring()
            {
                RingId = ringId,
                RingName = model.RingName,
                Price = model.Price,
                Quantity = model.Quantity,
                Resizable = model.Resizable,
                Size = model.Size,
                Material = model.Material,
                RingDescription = model.RingDescription,
                MadeIn = model.MadeIn,
                RingCategoryId = model.CategoryId,
                PathName = Helper.GetPathName(model.RingName)
            };
            var listImage = new List<Image>();
            foreach (var item in model.Images)
            {
                var image = new Image()
                {
                    RingImageId = Guid.NewGuid(),
                    Name = item.FileName,
                    Path = await _imageServices.SaveFileAsync(item),
                    RingId = ringId
                };
                listImage.Add(image);
            }
            await _context.Rings.AddAsync(ring);
            await _context.Images.AddRangeAsync(listImage);
            await _context.SaveChangesAsync();
            return ring;
        }
        public async Task<bool> UpdateRingAsync(Guid id, RingDTO model)
        {
            var ring = await _context.Rings.Where(x => x.RingId == id).Include(x => x.Images).FirstOrDefaultAsync();
            if (ring == null)
            {
                return false;
            }
            ring.RingName = model.RingName;
            ring.Price = model.Price;
            ring.Quantity = model.Quantity;
            ring.Resizable = model.Resizable;
            ring.Size = model.Size;
            ring.Material = model.Material;
            ring.RingDescription = model.RingDescription;
            ring.MadeIn = model.MadeIn;
            ring.RingCategoryId = model.CategoryId;
            ring.PathName = Helper.GetPathName(model.RingName);
            foreach(var item in ring.Images)
            {
                _imageServices.DeleteImage(item.Path);
            }
            _context.Images.RemoveRange(ring.Images);
            var listImage = new List<Image>();
            foreach (var item in model.Images)
            {
                var image = new Image()
                {
                    RingImageId = Guid.NewGuid(),
                    Name = item.FileName,
                    Path = await _imageServices.SaveFileAsync(item),
                    RingId = id
                };
                listImage.Add(image);
            }
            await _context.Images.AddRangeAsync(listImage);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        public async Task DeleteRingAsync(Guid id)
        {
            var ring = await _context.Rings.Where(x => x.RingId == id).Include(x => x.Images).FirstOrDefaultAsync();
            if (ring != null)
            {
                foreach (var item in ring.Images)
                {
                    _imageServices.DeleteImage(item.Path);
                }
                var result = _context.Rings.Remove(ring);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Ring> GetRingByPathNameAsync(string pathName)
        {
            var ring = await _context.Rings.Where(x => x.PathName == pathName).Include(x => x.Images).FirstOrDefaultAsync();
            if (ring != null)
            {
                return ring;
            }
            return null;
        }

        public async Task<List<Ring>> GetRingsByCategory(string pathName)
        {
            var category = await _context.RingCategories.Where(x => x.PathName == pathName).FirstOrDefaultAsync();
            if(category != null)
            {
                var rings = await _context.Rings.Where(x => x.RingCategoryId == category.RingCategoryId).Include(x => x.Images).ToListAsync();
                return rings;
            }
            return null;
        }

        public async Task<Ring> GetRingByIdAsync(Guid id) => await _context.Rings.Include(x => x.Images).Where(x => x.RingId == id).FirstOrDefaultAsync();

        public async Task<List<Ring>> FindRingByNameAsync(string keyword)
        {
            var result = await _context.Rings.Include(x => x.Images).Where(x => x.RingName.Contains(keyword)).ToListAsync();

            return result;
        }
    }
}
