
namespace DiamondProject.Models.Model
{
    public class RingCategory
    {
        public Guid RingCategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<Ring> Rings { get; } = new List<Ring>();
    }
}
