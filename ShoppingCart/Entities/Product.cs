namespace ShoppingCart.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Stock { get; set; }
    public string Author { get; set; } = string.Empty;
    public int CategoryId { get; set; }

    public virtual Category? Category { get; private set; }
    public virtual ICollection<CartItem>? CartItems { get; private set; }
}
