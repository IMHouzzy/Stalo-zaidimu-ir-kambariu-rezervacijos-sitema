using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;
        private readonly EmailService _emailService;
        public RegistrationController(StalozaidimuklubasContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Naudotoja newUser)
        {
            
            if (newUser == null)
                return BadRequest("Invalid user data.");

            // Validate role
            var allowedRoles = new[] { "User", "Admin" };
            if (!allowedRoles.Contains(newUser.Role))
                return BadRequest("Invalid role. Allowed roles are 'User' and 'Admin'.");

            // Add the new user to the database
            _context.Naudotojas.Add(newUser);
            await _context.SaveChangesAsync();

            // Send confirmation email after registration
            string subject = "Sėkminga registracija";
            string body = $"Sveiki, {newUser.Name}!\n\nJūsų registracija buvo sėkminga. Ačiū už prisijungimą prie Žaidimų alėjos!";
            await _emailService.SendEmailAsync(newUser.Email, subject, body);

            return Ok(newUser);
        }

    }


}
