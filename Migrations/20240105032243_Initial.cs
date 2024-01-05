using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Entrega2.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Proveedores",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RazonSocial = table.Column<string>(maxLength: 255, nullable: false),
                    NombreComercial = table.Column<string>(maxLength: 255, nullable: true),
                    IdentificacionTributaria = table.Column<string>(maxLength: 11, nullable: false),
                    NumeroTelefonico = table.Column<string>(nullable: true),
                    CorreoElectronico = table.Column<string>(nullable: true),
                    SitioWeb = table.Column<string>(nullable: true),
                    DireccionFisica = table.Column<string>(nullable: true),
                    Pais = table.Column<string>(maxLength: 255, nullable: false),
                    FacturacionAnual = table.Column<decimal>(nullable: false),
                    FechaUltimaEdicion = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Proveedores", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Proveedores");
        }
    }
}
