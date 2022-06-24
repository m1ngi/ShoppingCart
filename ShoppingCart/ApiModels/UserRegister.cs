using System.ComponentModel.DataAnnotations;

namespace ShoppingCart.ApiModels;

public class UserRegister
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    [Required, Compare("Password")]
    public string RepeatPassword { get; set; } = string.Empty;
    [Required]
    public string Name { get; set; } = string.Empty;
}