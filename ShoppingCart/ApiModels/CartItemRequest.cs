namespace ShoppingCart.ApiModels;

public class CartItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}