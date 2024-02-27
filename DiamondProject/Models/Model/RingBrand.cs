namespace DiamondProject.Models.Model
{
    public class RingBrand
    {
        public Guid RingBrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public float Price { get; set; }
        public string Material { get; set; }
        public string MadeIn { get; set; }
        public string PathName { get; set; }


        //relationship
        public Brand Brand { get; set; }
        public Guid BrandId { get; set; }

        public ICollection<RingBrandImage> RingBrandImages { get; } = new List<RingBrandImage>();
    }
}
