using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomes.Web.API.Migrations
{
    public partial class newcat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Color", "Emoji", "PrincipalNameIndex", "SearchTabIndex", "Titulo" },
                values: new object[] { 12, "yellow", "⛪", "11", "14", "Biblicos" });

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Color", "Emoji", "PrincipalNameIndex", "SearchTabIndex", "Titulo" },
                values: new object[] { 13, "", "", "12", "15", "InversedRanking" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 13);
        }
    }
}
