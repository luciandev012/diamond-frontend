﻿// <auto-generated />
using System;
using DiamondProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DiamondProject.Migrations
{
    [DbContext(typeof(DiamondDbContext))]
    partial class DiamondDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DiamondProject.Models.Model.Image", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RingId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Ring", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("MadeIn")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Material")
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("Resizable")
                        .HasColumnType("int");

                    b.Property<string>("RingDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RingName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Size")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Rings");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.RingCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("RingCategories");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Image", b =>
                {
                    b.HasOne("DiamondProject.Models.Model.Ring", "Ring")
                        .WithMany("Images")
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ring");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Ring", b =>
                {
                    b.HasOne("DiamondProject.Models.Model.RingCategory", "Category")
                        .WithMany("Rings")
                        .HasForeignKey("Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Ring", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.RingCategory", b =>
                {
                    b.Navigation("Rings");
                });
#pragma warning restore 612, 618
        }
    }
}
