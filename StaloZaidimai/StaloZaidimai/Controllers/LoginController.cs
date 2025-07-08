using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(StalozaidimuklubasContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginUser)
        {
            // Patikrinkite ar pateikti duomenys egzistuoja DB
            var user = await _context.Naudotojas
                .FirstOrDefaultAsync(u => u.Username == loginUser.Username && u.Password == loginUser.Password);

            if (user == null)
                return Unauthorized(new { message = "Netinkamas vartotojo vardas arba slaptažodis." });

            // Sugeneruoti JWT tokeną
            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private string GenerateJwtToken(Naudotoja user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.IdNaudotojas.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)  // UŽtikrinkite, kad role tikrai būtų čia
    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            Console.WriteLine("User role: " + user.Role);  // Patikrinkite, ar rolinė reikšmė yra teisinga

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

    // DTO klasė, kad būtų siunčiami tik reikalingi duomenys
    public class LoginDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
