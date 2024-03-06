using DiamondProject.Models;
using DiamondProject.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews()
    .AddJsonOptions(option => 
    {
        option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        option.JsonSerializerOptions.WriteIndented = true;
    });

//builder.Services.AddDbContext<DiamondDbContext>(option =>
//    option.UseSqlServer(builder.Configuration.GetConnectionString("DiamondDbContext")));
builder.Services.AddDbContext<DiamondDbContext>(option =>
    option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("myCORS",
        policy =>
        {
            policy.WithOrigins("https://localhost:44400").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Key").Value)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddTransient<RingCategoryServices>();
builder.Services.AddTransient<RingServices>();
builder.Services.AddTransient<ImageServices>();
builder.Services.AddTransient<RingBrandServices>();
builder.Services.AddTransient<UserServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DiamondDbContext>();
    dataContext.Database.EnsureCreated();
}

app.UseHttpsRedirection();

app.UseCors("myCORS");

app.UseStaticFiles();

app.UseAuthentication();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
