using DiamondProject.Common;
using DiamondProject.Models;
using DiamondProject.Models.InputModel;
using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;

namespace DiamondProject.Services
{
    public class RingCategoryServices
    {
        private readonly DiamondDbContext _context;
        public RingCategoryServices(DiamondDbContext context)
        {
            _context = context;
        }

        public async Task<List<RingCategory>> GetRingCategoriesAsync() => await _context.RingCategories.ToListAsync();

        public async Task<RingCategory> CreateRingCategoryAsync(RingCategoryDTO model)
        {
            var ringCategory = new RingCategory() { Name = model.Name, RingCategoryId = Guid.NewGuid(), Description = model.Description, PathName = Helper.GetPathName(model.Name) };
            await _context.RingCategories.AddAsync(ringCategory);
            var result = await _context.SaveChangesAsync();
            return ringCategory;
        }
        public async Task<int> DeleteRingCategoryAsync(Guid id)
        {
            var cate = await _context.RingCategories.FindAsync(id);
            if (cate != null)
            {
                _context.RingCategories.Remove(cate);
            }
            var res = await _context.SaveChangesAsync();
            return res;
        }
        public async Task<RingCategory> GetRingCategoryByPathName(string pathName)
        {
            var ringCategory = await _context.RingCategories.Include(x => x.Rings).Where(x => x.PathName == pathName).FirstOrDefaultAsync();
            return ringCategory;
        }
        public async Task<RingCategory> UpdateRingCategoryAsync(Guid id, RingCategoryDTO model)
        {
            var ringCategory = await _context.RingCategories.FindAsync(id);
            if (ringCategory != null)
            {
                ringCategory.Name = model.Name;
                ringCategory.Description = model.Description;
                ringCategory.PathName = Helper.GetPathName(model.Name);
                await _context.SaveChangesAsync();
                return ringCategory;
            }
            return null;
        }
    }
}
