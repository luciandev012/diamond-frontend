using DiamondProject.Common;
using DiamondProject.Models;
using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Net.NetworkInformation;

namespace DiamondProject.Services
{
	public class RingBrandServices
	{
		private readonly DiamondDbContext _context;
		private readonly ImageServices _imageServices;

		public RingBrandServices(DiamondDbContext context, ImageServices imageServices)
		{
			_context = context;
			_imageServices = imageServices;
		}

		public async Task<List<Brand>> GetBrandsAsync() => await _context.Brands.ToListAsync();

		public async Task<Brand> GetBrandAsync(Guid id) => await _context.Brands.FindAsync(id);

		public async Task<Brand> CreateBrandAsync(BrandDTO model)
		{
			var brand = new Brand()
			{
				BrandId = Guid.NewGuid(),
				Name = model.Name,
				Description = model.Description,
				PathName = Helper.GetPathName(model.Name)
			};
			await _context.Brands.AddAsync(brand);
			var res = await _context.SaveChangesAsync();
			return res > 0 ? brand : null;
		}
		public async Task<Brand> UpdateBrandAsync(Guid id, BrandDTO model)
		{
			var brand = await _context.Brands.FindAsync(id);
			if(brand != null)
			{
				brand.Name = model.Name;
				brand.Description = model.Description;
				brand.PathName = Helper.GetPathName(model.Name);

				await _context.SaveChangesAsync();
				return brand;
			}
			return null;
		}

		public async Task<bool> DeleteBrandAsync(Guid id)
		{
			var brand = await _context.Brands.FindAsync(id);
			if(brand != null)
			{
				_context.Brands.Remove(brand);
				await _context.SaveChangesAsync();
				return true;
			}
			return false;
		}

        public async Task<List<RingBrand>> GetRingsBrandsAsync() => await _context.RingsBrands.ToListAsync();

        public async Task<RingBrand> GetRingsBrandAsync(Guid id) => await _context.RingsBrands.FindAsync(id);

        public async Task<RingBrand> CreateRingBrandAsync(RingBrandDTO model)
        {
			var ringBrandId = Guid.NewGuid();
            var ringBrand = new RingBrand()
            {
                RingBrandId = ringBrandId,
                Name = model.Name,
                Price = model.Price,
                Quantity = model.Quantity,
                Size = model.Size,
                Material = model.Material,
                Description = model.Description,
                MadeIn = model.MadeIn,
                BrandId = model.BrandId,
                PathName = Helper.GetPathName(model.Name)
            };

			var listImage = new List<RingBrandImage>();
			foreach (var image in model.Images)
			{
				var ringsBrandImage = new RingBrandImage()
				{
					Name = image.Name,
					RingBrandId = ringBrandId,
					Path = Helper.GetPathName(image.Name),
					RingBrandImageId = Guid.NewGuid()
				};
				listImage.Add(ringsBrandImage);
			}

            await _context.RingsBrands.AddAsync(ringBrand);
			await _context.RingsBrandImages.AddRangeAsync(listImage);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? ringBrand : null;
        }
        public async Task<RingBrand> UpdateRingBrandAsync(Guid id, RingBrandDTO model)
        {
            var ringBrand = await _context.RingsBrands.FindAsync(id);
            if (ringBrand != null)
            {
                ringBrand.Name = model.Name;
                ringBrand.Description = model.Description;
                ringBrand.PathName = Helper.GetPathName(model.Name);
				ringBrand.Price = model.Price;
				ringBrand.Quantity = model.Quantity;
				ringBrand.Size = model.Size;
				ringBrand.Material = model.Material;
                ringBrand.MadeIn = model.MadeIn;

                foreach (var item in ringBrand.RingBrandImages)
                {
                    _imageServices.DeleteImage(item.Path);
                }
                _context.RingsBrandImages.RemoveRange(ringBrand.RingBrandImages);

                var listImage = new List<RingBrandImage>();

                foreach (var image in model.Images)
                {
                    var ringsBrandImage = new RingBrandImage()
                    {
                        Name = image.Name,
                        RingBrandId = id,
                        Path = Helper.GetPathName(image.Name),
                        RingBrandImageId = Guid.NewGuid()
                    };
                    listImage.Add(ringsBrandImage);
                }

                await _context.SaveChangesAsync();
                return ringBrand;
            }
            return null;
        }

        public async Task<bool> DeleteRingBrandAsync(Guid id)
        {
            var ringBrand = await _context.RingsBrands.FindAsync(id);
            if (ringBrand != null)
            {
                _context.RingsBrands.Remove(ringBrand);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

    }
}

