using System.ComponentModel.DataAnnotations;

namespace DiamondProject.Models.Model
{
    public class RingCategory
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Ring> Rings { get; } = new List<Ring>();
    }
}
