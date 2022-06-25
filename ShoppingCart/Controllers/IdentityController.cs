using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingCart.ApiModels;
using ShoppingCart.Entities;
using ShoppingCart.Helpers;
using ShoppingCart.Interfaces;

namespace ShoppingCart.Controllers;

[ApiController]
[Route("api/auth")]
public class IdentityController : Controller
{
    private readonly IRepository<User> _repo;
    private readonly IPasswordHashing _hashing;
    private readonly JwtGenerator _jwt;

    public IdentityController(IRepository<User> repo, JwtGenerator jwt)
    {
        _repo = repo;
        _jwt = jwt;
        _hashing = new Hasher();
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UserCredential credential)
    {
        var password = _hashing.Hash(credential.Password);
        var user = await _repo.Source
            .FirstOrDefaultAsync(e => e.Username == credential.Username && e.Password == password);

        if (user == null)
            return Unauthorized(new { error = "username or password is incorrect"});

        var jwt = _jwt.Generate(user.Id, user.Name);

        return Ok(new { jwt, user.Name });
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegister data)
    {
        if (ModelState.IsValid)
        {
            var hasUserUsedUsername = _repo.Source.Any(e => e.Username == data.Username);

            if (hasUserUsedUsername)
                return BadRequest(new { error = "username has been used" });

            var password = _hashing.Hash(data.Password);

            var user = new User
            {
                Password = password,
                Username = data.Username,
                Name = data.Name,
            };

            await _repo.Source.AddAsync(user);
            await _repo.Save();

            var jwt = _jwt.Generate(user.Id, user.Name);

            return Ok(new { jwt, user.Name });
        }

        return BadRequest();
    }

    [HttpGet]
    [Route("name")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult GetName()
    {
        var name = HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty;
        return Ok(new { name });
    }
}