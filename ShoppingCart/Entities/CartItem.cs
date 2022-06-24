namespace ShoppingCart.Entities;

public class CartItem
{
    public int Id { get; private set; }
    public int Quantity { get; private set; } = 0;
    public double Total { get; private set; } = 0;
    public int CartId { get; set; }
    public int ProductId { get; set; }

    public virtual Cart? Cart { get; private set; }
    public virtual Product? Product { get; private set; }

    public double UpdateQuantity(int newQuantity, double productPrice)
    {
        if (newQuantity <= 0)
            throw new ArgumentOutOfRangeException($"{UpdateQuantity} not accept quantity smaller than 1");

        var diff = newQuantity - Quantity;
        var totalPrice = newQuantity * productPrice;
        Quantity = newQuantity;
        Total += totalPrice;
        return totalPrice;
    }
}
