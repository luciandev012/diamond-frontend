using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiamondProject.Migrations
{
    public partial class InitWithSqlite : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RingCategories",
                columns: table => new
                {
                    RingCategoryId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RingCategories", x => x.RingCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Rings",
                columns: table => new
                {
                    RingId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RingName = table.Column<string>(type: "TEXT", nullable: true),
                    RingDescription = table.Column<string>(type: "TEXT", nullable: true),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Size = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<float>(type: "REAL", nullable: false),
                    Material = table.Column<string>(type: "TEXT", nullable: true),
                    Resizable = table.Column<int>(type: "INTEGER", nullable: false),
                    MadeIn = table.Column<string>(type: "TEXT", nullable: true),
                    RingCategoryId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rings", x => x.RingId);
                    table.ForeignKey(
                        name: "FK_Rings_RingCategories_RingCategoryId",
                        column: x => x.RingCategoryId,
                        principalTable: "RingCategories",
                        principalColumn: "RingCategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    RingImageId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Path = table.Column<string>(type: "TEXT", nullable: true),
                    RingId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.RingImageId);
                    table.ForeignKey(
                        name: "FK_Images_Rings_RingId",
                        column: x => x.RingId,
                        principalTable: "Rings",
                        principalColumn: "RingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_RingId",
                table: "Images",
                column: "RingId");

            migrationBuilder.CreateIndex(
                name: "IX_Rings_RingCategoryId",
                table: "Rings",
                column: "RingCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Rings");

            migrationBuilder.DropTable(
                name: "RingCategories");
        }
    }
}
