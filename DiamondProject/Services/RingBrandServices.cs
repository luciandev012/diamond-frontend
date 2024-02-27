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
		public async Task<bool> UpdateBrandAsync(Guid id, BrandDTO model)
		{
			var brand = await _context.Brands.FindAsync(id);
			if(brand != null)
			{
				brand.Name = model.Name;
				brand.Description = model.Description;
				brand.PathName = Helper.GetPathName(model.Name);

				await _context.SaveChangesAsync();
				return true;
			}
			return false;
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

	}
}

