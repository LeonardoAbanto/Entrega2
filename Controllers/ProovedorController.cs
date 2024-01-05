// ProveedorController.cs

using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entrega2;
using System;

namespace Entrega2.Controllers
{
    [ApiController]
    [Route("/api/proveedores")]
    public class ProveedorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProveedorController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ObtenerProveedores()
        {
            var proveedores = _context.Proveedores.ToList();
            return Ok(proveedores);
        }

    [HttpPost]
    public IActionResult InsertarProveedor([FromBody] Proveedor nuevoProveedor)
    {
        try
        {
            _context.Proveedores.Add(nuevoProveedor);
            _context.SaveChanges();
            return Ok(new { mensaje = "Proveedor insertado exitosamente" });
        }
        catch (DbUpdateException ex)
        {
            // Loguear el error para obtener más detalles
            Console.Error.WriteLine($"Error al insertar proveedor (DbUpdateException): {ex.Message}");

            // Devolver un código de estado 500 junto con un mensaje de error
            return StatusCode(500, new { mensaje = "Error interno del servidor al insertar proveedor", detalle = ex.Message });
        }
        catch (Exception ex)
        {
            // Loguear el error para obtener más detalles
            Console.Error.WriteLine($"Error al insertar proveedor (Exception): {ex.Message}");

            // Devolver un código de estado 500 junto con un mensaje de error
            return StatusCode(500, new { mensaje = "Error interno del servidor al insertar proveedor", detalle = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public IActionResult EliminarProveedor(int id)
    {
        try
        {
            var proveedor = _context.Proveedores.Find(id);

            if (proveedor == null)
            {
                return NotFound(new { mensaje = "Proveedor no encontrado" });
            }

            _context.Proveedores.Remove(proveedor);
            _context.SaveChanges();

            return Ok(new { mensaje = "Proveedor eliminado exitosamente" });
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error al eliminar proveedor: {ex.Message}");
            return StatusCode(500, new { mensaje = "Error interno del servidor al eliminar proveedor" });
        }
    }

    [HttpPut("{id}")]
        public IActionResult ActualizarProveedor(int id, [FromBody] Proveedor proveedorActualizado)
        {
            try
            {
                var proveedorExistente = _context.Proveedores.Find(id);

                if (proveedorExistente == null)
                {
                    return NotFound(new { mensaje = $"Proveedor con Id {id} no encontrado" });
                }

                // Actualiza las propiedades del proveedorExistente con los valores de proveedorActualizado
                _context.Entry(proveedorExistente).CurrentValues.SetValues(proveedorActualizado);

                // Guarda los cambios en la base de datos
                _context.SaveChanges();

                return Ok(new { mensaje = "Proveedor actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                // Loguear el error para obtener más detalles
                Console.Error.WriteLine($"Error al actualizar proveedor (Exception): {ex.Message}");

                // Devolver un código de estado 500 junto con un mensaje de error
                return StatusCode(500, new { mensaje = "Error interno del servidor al actualizar proveedor", detalle = ex.Message });
            }
        }

    }
}
