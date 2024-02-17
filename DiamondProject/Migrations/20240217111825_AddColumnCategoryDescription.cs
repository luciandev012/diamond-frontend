using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DiamondProject.Migrations
{
    public partial class AddColumnCategoryDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RingCategories",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "RingCategories");
        }
    }
}
