using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiamondProject.Models.Model
{
    public class Ring
    {
        [Key]
        public Guid Id { get; set; }
        public string RingName { get; set; }
        [DataType(DataType.MultilineText)]
        public string RingDescription { get; set;}
        public int Quantity { get; set; }
        public string Size { get; set; }
        public float Price { get; set; }
        public string Material { get; set; }
        public int Resizable { get; set; }
        public string MadeIn { get; set; }

        //relationship
        public RingCategory Category { get; set; }
        public Guid CategoryId { get; set; }

        public ICollection<Image> Images { get; } = new List<Image>();

    }
}
