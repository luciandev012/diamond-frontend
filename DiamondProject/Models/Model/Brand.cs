namespace DiamondProject.Models.Model
{
    public class Brand
    {
        public Guid BrandId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PathName { get; set; }

        public ICollection<RingBrand> RingBrands { get; } = new List<RingBrand>();

    }
}
