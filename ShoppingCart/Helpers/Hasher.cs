using System.Security.Cryptography;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Helpers;

public class Hasher : IPasswordHashing
{
    private readonly MD5 _md5;

    public Hasher()
    {
        _md5 = MD5.Create();
    }

    public string Hash(string plainText)
    {
        var inputBytes = System.Text.Encoding.ASCII.GetBytes(plainText);
        var hashBytes = _md5.ComputeHash(inputBytes);

        return Convert.ToHexString(hashBytes);
    }
}