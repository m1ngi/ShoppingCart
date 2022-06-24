using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.Entities;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : Controller
{
    private readonly IRepository<Product> _repo;

    public ProductController(IRepository<Product> repo)
    {
        _repo = repo;
    }

    [HttpGet(Order = 0)]
    public async Task<IActionResult> GetAllProduct()
    {
        var products = await _repo.Source.Select(e => new
        {
            e.Id,
            e.Name,
            e.Image,
            e.Price,
            e.Stock
        }).ToListAsync();

        return Ok(products);
    }

    [HttpGet(Order = 1)]
    public async Task<IActionResult> FilterProductByName([FromQuery] string productName)
    {
        var products = await _repo.Source
            .Where(e => e.Name.Contains(productName))
            .Select(e => new
            {
                e.Id,
                e.Name,
                e.Image,
                e.Price,
                e.Stock
            }).ToListAsync();

        return Ok(products);
    }

    //[HttpGet]
    //[Route("products")]
    //public async Task<IActionResult> FilterProduct([FromQuery] int category, [FromQuery] string productName)
    //{
    //    var products = await _repo.Source
    //        .Where(e => e.CategoryId == category)
    //        .Where(e => e.Name.Contains(productName))
    //        .Select(e => new
    //        {
    //            e.Id,
    //            e.Name,
    //            e.Image,
    //            e.Price,
    //            e.Stock
    //        }).ToListAsync();

    //    return Ok(products);
    //}

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetProductDetail([FromRoute] int id)
    {
        var product = await _repo.Source
            .Include(e => e.Category)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (product == null)
            return NotFound();

        return Ok(new
        {
            product.Id,
            product.Name,
            product.Stock,
            product.Image,
            product.Price,
            product.Author,
            product.Description
        });
    }
}