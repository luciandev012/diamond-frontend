namespace DiamondProject.Models.InputModel
{
    public class RingBrandDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public float Price { get; set; }
        public string Material { get; set; }
        public int Resizable { get; set; }
        public string MadeIn { get; set; }
        public Guid BrandId { get; set; }
        public List<IFormFile> Images { get; set; }
    }
}
