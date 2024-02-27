using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiamondProject.Migrations
{
    public partial class AddPathNameToEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PathName",
                table: "Rings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PathName",
                table: "RingCategories",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathName",
                table: "Rings");

            migrationBuilder.DropColumn(
                name: "PathName",
                table: "RingCategories");
        }
    }
}
