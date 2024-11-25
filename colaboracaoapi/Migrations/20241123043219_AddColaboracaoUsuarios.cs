using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace colaboracaoapi.Migrations
{
    /// <inheritdoc />
    public partial class AddColaboracaoUsuarios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("PRAGMA foreign_keys = OFF;", suppressTransaction: true);

            migrationBuilder.AddColumn<long>(
                name: "ColaboracaoId",
                table: "Usuarios",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_ColaboracaoId",
                table: "Usuarios",
                column: "ColaboracaoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Colaboracoes_ColaboracaoId",
                table: "Usuarios",
                column: "ColaboracaoId",
                principalTable: "Colaboracoes",
                principalColumn: "Id");

            migrationBuilder.Sql("PRAGMA foreign_keys = ON;", suppressTransaction: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Colaboracoes_ColaboracaoId",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_ColaboracaoId",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "ColaboracaoId",
                table: "Usuarios");
        }
    }
}
