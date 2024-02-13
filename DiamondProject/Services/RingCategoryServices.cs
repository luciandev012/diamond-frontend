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

        public async Task CreateRingCategoryAsync(RingCategoryDTO model)
        {
            var ringCategory = new RingCategory() { Name = model.Name, Id = Guid.NewGuid() };
            await _context.RingCategories.AddAsync(ringCategory);
            var result = await _context.SaveChangesAsync();
        }
    }
}
