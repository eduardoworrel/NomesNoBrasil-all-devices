using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomes.Web.API.Migrations
{
    public partial class floresEartistasBr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Emoji", "Titulo" },
                values: new object[] { "📺", "Internacional" });

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Color", "Emoji", "PrincipalNameIndex", "SearchTabIndex", "Titulo" },
                values: new object[] { 9, "orange", "🇧🇷", "8", "11", "Artistas" });

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Color", "Emoji", "PrincipalNameIndex", "SearchTabIndex", "Titulo" },
                values: new object[] { 10, "pink", "🌹", "9", "12", "Flores" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Emoji", "Titulo" },
                values: new object[] { "✨", "Famosos" });
        }
    }
}
