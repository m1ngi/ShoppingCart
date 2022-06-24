using Microsoft.EntityFrameworkCore;
using ShoppingCart.Database;
using ShoppingCart.Entities;
using ShoppingCart.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<ShoppingDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ShoppingServer"));
});

builder.Services.AddTransient<IRepository<Product>, ShoppingDbContext>();
builder.Services.AddTransient<IRepository<Cart>, ShoppingDbContext>();
builder.Services.AddTransient<IRepository<Category>, ShoppingDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();