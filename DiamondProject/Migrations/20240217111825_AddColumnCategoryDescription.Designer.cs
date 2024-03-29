﻿// <auto-generated />
using System;
using DiamondProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DiamondProject.Migrations
{
    [DbContext(typeof(DiamondDbContext))]
    [Migration("20240217111825_AddColumnCategoryDescription")]
    partial class AddColumnCategoryDescription
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.21");

            modelBuilder.Entity("DiamondProject.Models.Model.Image", b =>
                {
                    b.Property<Guid>("RingImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Path")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RingId")
                        .HasColumnType("TEXT");

                    b.HasKey("RingImageId");

                    b.HasIndex("RingId");

                    b.ToTable("Images", (string)null);
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Ring", b =>
                {
                    b.Property<Guid>("RingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("MadeIn")
                        .HasColumnType("TEXT");

                    b.Property<string>("Material")
                        .HasColumnType("TEXT");

                    b.Property<float>("Price")
                        .HasColumnType("REAL");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Resizable")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("RingCategoryId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RingDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("RingName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Size")
                        .HasColumnType("TEXT");

                    b.HasKey("RingId");

                    b.HasIndex("RingCategoryId");

                    b.ToTable("Rings", (string)null);
                });

            modelBuilder.Entity("DiamondProject.Models.Model.RingCategory", b =>
                {
                    b.Property<Guid>("RingCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("RingCategoryId");

                    b.ToTable("RingCategories", (string)null);
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Image", b =>
                {
                    b.HasOne("DiamondProject.Models.Model.Ring", "Ring")
                        .WithMany("Images")
                        .HasForeignKey("RingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ring");
                });

            modelBuilder.Entity("DiamondProject.Models.Model.Ring", b =>
                {
                    b.HasOne("DiamondProject.Models.Model.RingCategory", "Category")
                        .WithMany("Rings")
                        .HasForeignKey("RingCategoryId")
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
