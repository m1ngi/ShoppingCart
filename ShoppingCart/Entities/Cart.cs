namespace ShoppingCart.Entities;

public class Cart
{
    public int Id { get; set; }
    
    public bool IsCheckout { get; set; } = false;
    public double Total { get; private set; } = 0;

    public string UserId { get; set; } = string.Empty;
    public User? User { get; private set; }

    private readonly List<CartItem> _items = new();
    public IReadOnlyCollection<CartItem> Items => _items.AsReadOnly();

    public void AddItem(int productId, int quantity, double productPrice)
    {
        var item = _items.FirstOrDefault(e => e.ProductId == productId);

        if (item == null)
        {
            item = new CartItem() { ProductId = productId };
            Total += item.UpdateQuantity(quantity, productPrice);
            _items.Add(item);
            return;
        }

        Total += item.UpdateQuantity(quantity, productPrice);
    }

    public void RemoveItem(int productId)
    {
        var item = _items.FirstOrDefault(e => e.ProductId == productId);

        if (item == null)
            throw new NullReferenceException("not found product in cart");

        _items.Remove(item);
        Total -= item.Total;
    }
}
