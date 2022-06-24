﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.ApiModels;
using ShoppingCart.Entities;
using ShoppingCart.Helpers;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Controllers;

[ApiController]
[Route("api/cart")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class CartController : Controller
{
    private readonly IRepository<Cart> _repo;
    private readonly IRepository<Product> _store;
    private readonly CurrentUser _user;

    public CartController(IRepository<Cart> repo, CurrentUser user,
        IRepository<Product> store)
    {
        _repo = repo;
        _user = user;
        _store = store;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrentCart()
    {
        var cart = await Get();
        var result = new
        {
            cart.Total,
            Items = cart.Items.Select(e => new
            {
                e.Total,
                e.Quantity,
                e.Id,
                e?.Product?.Price
            })
        };
        return Ok(cart);
    }

    [HttpPost]
    [Route("items")]
    public async Task<IActionResult> AddItem([FromBody] CartItemRequest item)
    {
        var cart = await Get();

        var product = await _store.Source.FindAsync(item.ProductId);

        if (product == null)
            return BadRequest("product is not found");

        cart.AddItem(item.ProductId, item.Quantity, product.Price);

        if (cart.Id == 0)
            await _repo.Source.AddAsync(cart);
        else
            _repo.Source.Update(cart);

        await _store.Save();

        return NoContent();
    }

    [HttpPatch]
    [Route("items")]
    public async Task<IActionResult> UpdateItem([FromBody] UpdateCartItem item)
    {
        var cart = await Get();

        cart.UpdateItem(item.Id, item.Quantity);

        _repo.Source.Update(cart);

        await _repo.Save();

        return NoContent();
    }

    private async Task<Cart> Get()
    {
        var cart = await _repo.Source
            .Include(e => e.Items)
            .ThenInclude(e => e.Product)
            .Where(e => !e.IsCheckout)
            .FirstOrDefaultAsync(e => e.UserId == _user.Id);

        return cart ?? new Cart();
    }
}