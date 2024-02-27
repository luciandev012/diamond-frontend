namespace DiamondProject.Models.Model
{
    public class RingBrandImage
    {
        public Guid RingBrandImageId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        //relationship
        public Guid RingBrandId { get; set; }
        public RingBrand RingBrand { get; set; }
    }
}
