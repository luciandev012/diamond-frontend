using DiamondProject.Common;
using DiamondProject.Models;
using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;

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

        public async Task<List<RingBrand>> GetRingBrandsAsync() => await _context.RingsBrands.ToListAsync();

        public async Task<RingBrand> GetRingBrandAsync(Guid id) => await _context.RingsBrands.FindAsync(id);

        public async Task<RingBrand> CreateRingBrandAsync(RingBrandDTO model)
        {
			var ringBrandId = Guid.NewGuid();
            var ringBrand = new RingBrand()
            {
                 RingBrandId = ringBrandId,
				 Name = model.Name,
				 PathName = Helper.GetPathName(model.Name),
				 Description = model.Description,
				 MadeIn = model.MadeIn,
				 Material = model.Material,
				 Price = model.Price,
				 Size = model.Size,
				 BrandId = model.BrandId,
				 Quantity = model.Quantity
            };

			var listImages = new List<RingBrandImage>();
			foreach (var item in model.Images)
			{
				var imageId = Guid.NewGuid();
				var imgae = new RingBrandImage()
				{
					Name = item.FileName,
					RingBrandId = ringBrandId,
					Path = await _imageServices.SaveFileAsync(item),
					RingBrandImageId = imageId
				};
				listImages.Add(imgae);
			}

            await _context.RingsBrands.AddAsync(ringBrand);
			await _context.RingsBrandImages.AddRangeAsync(listImages);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? ringBrand : null;
        }

    }
}

