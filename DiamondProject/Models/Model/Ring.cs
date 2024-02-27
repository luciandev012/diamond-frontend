

namespace DiamondProject.Models.Model
{
    public class Ring
    {
        public Guid RingId { get; set; }
        public string RingName { get; set; }
        public string RingDescription { get; set;}
        public int Quantity { get; set; }
        public string Size { get; set; }
        public float Price { get; set; }
        public string Material { get; set; }
        public int Resizable { get; set; }
        public string MadeIn { get; set; }

        //relationship
        public RingCategory Category { get; set; }
        public Guid RingCategoryId { get; set; }

        public ICollection<Image> Images { get; } = new List<Image>();
        public string PathName { get; set; }

    }
}
