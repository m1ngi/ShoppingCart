using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShoppingCart.Entities;

namespace ShoppingCart.Database.Configurations;

public class CartEntityConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.ToTable(nameof(Cart));

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id).ValueGeneratedOnAdd();

        builder.HasOne(e => e.User)
            .WithMany(e => e.Carts)
            .HasForeignKey(e => e.UserId);
    }
}
