using DiamondProject.Models;
using DiamondProject.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews()
    .AddJsonOptions(option => option.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddDbContext<DiamondDbContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("DiamondDbContext")));

builder.Services.AddTransient<RingCategoryServices>();
builder.Services.AddTransient<RingServices>();
builder.Services.AddTransient<ImageServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
