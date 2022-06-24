namespace ShoppingCart.Interfaces;

public interface IPasswordHashing
{
    string Hash(string plainText);
}