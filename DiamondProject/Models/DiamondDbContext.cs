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

            modelBuilder.Entity<RingCategory>().HasMany(e => e.Rings).WithOne(e => e.Category).HasForeignKey(e => e.RingCategoryId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Ring>().HasMany(e => e.Images).WithOne(e => e.Ring).HasForeignKey(e => e.RingId).OnDelete(DeleteBehavior.Cascade);
        }

        public virtual DbSet<RingCategory> RingCategories { get; set; }
        public virtual DbSet<Ring> Rings { get; set; }
        public virtual DbSet<Image> Images { get; set; }
    }
}
