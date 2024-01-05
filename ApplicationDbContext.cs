using Microsoft.EntityFrameworkCore;

namespace Entrega2
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Proveedor> Proveedores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
