using System;
using System.ComponentModel.DataAnnotations;

public class Proveedor
{
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string RazonSocial { get; set; }

    [MaxLength(255)]
    public string NombreComercial { get; set; }

    [Required]
    [StringLength(11, MinimumLength = 11)]
    public string IdentificacionTributaria { get; set; }

    [Phone]
    public string NumeroTelefonico { get; set; }

    [EmailAddress]
    public string CorreoElectronico { get; set; }

    [Url]
    public string SitioWeb { get; set; }

    public string DireccionFisica { get; set; }

    [Required]
    [MaxLength(255)]
    public string Pais { get; set; }

    public decimal FacturacionAnual { get; set; }

    public DateTime FechaUltimaEdicion { get; set; }
}
