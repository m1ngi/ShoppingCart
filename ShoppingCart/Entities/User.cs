namespace ShoppingCart.Entities;

public class User
{
    public User()
    {
        Id = Guid.NewGuid().ToString();
    }

    public string Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; //hash password
    public string Name { get; set; } = string.Empty;

    private readonly List<Cart> _carts = new();
    public IReadOnlyCollection<Cart> Carts => _carts.AsReadOnly();
}
