using Microsoft.EntityFrameworkCore;
using ShoppingCart.Database.Configurations;
using ShoppingCart.Entities;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Database;

public class ShoppingDbContext : DbContext, IRepository<Product>, IRepository<User>, IRepository<Cart>, IRepository<Category>
{
    public ShoppingDbContext(DbContextOptions<ShoppingDbContext> options): base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
        modelBuilder.ApplyConfiguration(new ProductEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CartEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CartItemEntityConfigration());
        modelBuilder.ApplyConfiguration(new CategoryEntityConfiguration());

        base.OnModelCreating(modelBuilder);
    }

    public Task Save() => this.SaveChangesAsync();

    public DbSet<Product> Source => Set<Product>();

    DbSet<Cart> IRepository<Cart>.Source => Set<Cart>();

    DbSet<Category> IRepository<Category>.Source => Set<Category>();

    DbSet<User> IRepository<User>.Source => Set<User>();
}
