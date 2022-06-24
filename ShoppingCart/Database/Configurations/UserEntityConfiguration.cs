using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShoppingCart.Entities;

namespace ShoppingCart.Database.Configurations;

public class UserEntityConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable(nameof(User));
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Username).IsRequired();
        builder.Property(e => e.Password).IsRequired();
        builder.Property(e => e.Name).IsRequired();
    }
}
