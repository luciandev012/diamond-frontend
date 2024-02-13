
namespace DiamondProject.Models.InputModel
{
    public class RingDTO
    {
        public string RingName { get; set; }
        public string RingDescription { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public float Price { get; set; }
        public string Material { get; set; }
        public int Resizable { get; set; }
        public string MadeIn { get; set; }
        public Guid CategoryId { get; set; }
        public List<IFormFile> Images { get; set; }
    }
}
