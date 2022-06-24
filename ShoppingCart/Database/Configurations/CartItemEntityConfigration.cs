using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ShoppingCart.Entities;

namespace ShoppingCart.Database.Configurations;

public class CartItemEntityConfigration : IEntityTypeConfiguration<CartItem>
{
    public void Configure(EntityTypeBuilder<CartItem> builder)
    {
        builder.ToTable(nameof(CartItem));
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();

        builder.HasOne(e => e.Cart)
            .WithMany(e => e.Items)
            .HasForeignKey(e => e.CartId);

        builder.HasOne(e => e.Product)
            .WithMany(e => e.CartItems)
            .HasForeignKey(e => e.ProductId);
    }
}
