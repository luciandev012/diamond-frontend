using System.ComponentModel.DataAnnotations;

namespace DiamondProject.Models.Model
{
    public class Image
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        //relationship
        public Guid RingId { get; set; }
        public Ring Ring { get; set; }
    }
}
