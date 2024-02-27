using DiamondProject.Models.Model;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace DiamondProject.Models
{
    public class DiamondDbContext : DbContext
    {
        public DiamondDbContext(DbContextOptions<DiamondDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ring>().ToTable("Rings").HasKey(e => e.RingId);
            modelBuilder.Entity<RingCategory>().ToTable("RingCategories").HasKey(e => e.RingCategoryId);
            modelBuilder.Entity<Image>().ToTable("Images").HasKey(e => e.RingImageId);
            modelBuilder.Entity<Brand>().ToTable("Brands").HasKey(e => e.BrandId);
            modelBuilder.Entity<RingBrand>().ToTable("RingBrands").HasKey(e => e.RingBrandId);
            modelBuilder.Entity<RingBrandImage>().ToTable("RingBrandImages").HasKey(e => e.RingBrandImageId);

            modelBuilder.Entity<RingCategory>().HasMany(e => e.Rings).WithOne(e => e.Category).HasForeignKey(e => e.RingCategoryId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Ring>().HasMany(e => e.Images).WithOne(e => e.Ring).HasForeignKey(e => e.RingId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Brand>().HasMany(e => e.RingBrands).WithOne(e => e.Brand).HasForeignKey(e => e.BrandId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<RingBrand>().HasMany(e => e.RingBrandImages).WithOne(e => e.RingBrand).HasForeignKey(e => e.RingBrandId).OnDelete(DeleteBehavior.Cascade);
        }

        public virtual DbSet<RingCategory> RingCategories { get; set; }
        public virtual DbSet<Ring> Rings { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<RingBrand> RingsBrands { get; set; }
        public virtual DbSet<RingBrandImage> RingsBrandImages { get; set; }
    }
}
