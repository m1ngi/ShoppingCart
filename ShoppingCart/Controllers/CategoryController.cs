using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.Entities;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : Controller
{
    private readonly IRepository<Category> _repo;

    public CategoryController(IRepository<Category> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _repo.Source
            .Select(e => new { e.Id, e.Name })
            .ToListAsync();

        return Ok(categories);
    }
}