using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiamondProject.Migrations
{
    public partial class AddRingBrandTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    BrandId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    PathName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.BrandId);
                });

            migrationBuilder.CreateTable(
                name: "RingBrands",
                columns: table => new
                {
                    RingBrandId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Size = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<float>(type: "REAL", nullable: false),
                    Material = table.Column<string>(type: "TEXT", nullable: true),
                    MadeIn = table.Column<string>(type: "TEXT", nullable: true),
                    PathName = table.Column<string>(type: "TEXT", nullable: true),
                    BrandId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RingBrands", x => x.RingBrandId);
                    table.ForeignKey(
                        name: "FK_RingBrands_Brands_BrandId",
                        column: x => x.BrandId,
                        principalTable: "Brands",
                        principalColumn: "BrandId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RingBrandImages",
                columns: table => new
                {
                    RingBrandImageId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Path = table.Column<string>(type: "TEXT", nullable: true),
                    RingBrandId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RingBrandImages", x => x.RingBrandImageId);
                    table.ForeignKey(
                        name: "FK_RingBrandImages_RingBrands_RingBrandId",
                        column: x => x.RingBrandId,
                        principalTable: "RingBrands",
                        principalColumn: "RingBrandId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RingBrandImages_RingBrandId",
                table: "RingBrandImages",
                column: "RingBrandId");

            migrationBuilder.CreateIndex(
                name: "IX_RingBrands_BrandId",
                table: "RingBrands",
                column: "BrandId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RingBrandImages");

            migrationBuilder.DropTable(
                name: "RingBrands");

            migrationBuilder.DropTable(
                name: "Brands");
        }
    }
}
