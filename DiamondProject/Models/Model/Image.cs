

namespace DiamondProject.Models.Model
{
    public class Image
    {
        public Guid RingImageId { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        //relationship
        public Guid RingId { get; set; }
        public Ring Ring { get; set; }
    }
}
