using Microsoft.EntityFrameworkCore;

namespace ShoppingCart.Interfaces;

public interface IRepository<T>
    where T : class
{
    DbSet<T> Source { get; }
}