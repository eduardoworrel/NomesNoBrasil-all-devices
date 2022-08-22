using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomes.Web.API.Migrations
{
    public partial class presidente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 5,
                column: "Emoji",
                value: "🧑‍🎤");

            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 9,
                column: "Emoji",
                value: "👩‍🎤");

            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Color", "Emoji", "PrincipalNameIndex", "SearchTabIndex", "Titulo" },
                values: new object[] { 11, "green", "🇧🇷", "10", "13", "Presidentes" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 5,
                column: "Emoji",
                value: "📺");

            migrationBuilder.UpdateData(
                table: "Categorias",
                keyColumn: "Id",
                keyValue: 9,
                column: "Emoji",
                value: "🇧🇷");
        }
    }
}
