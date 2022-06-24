using Microsoft.EntityFrameworkCore;

namespace ShoppingCart.Interfaces;

public interface ICommit
{
    Task Save();
}

public interface IRepository<T> : ICommit
    where T : class
{
    DbSet<T> Source { get; }
}