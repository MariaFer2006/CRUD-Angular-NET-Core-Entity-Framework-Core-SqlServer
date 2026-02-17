using backendTarjetas.Models;
using Microsoft.EntityFrameworkCore;

namespace backendTarjetas
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }
    }
}
