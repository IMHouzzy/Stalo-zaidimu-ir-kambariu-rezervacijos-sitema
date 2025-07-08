using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;
//using StaloZaidimai.Models; // Adjust if your model is in a different namespace

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EditController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public EditController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaloZaidimas(int id, [FromBody] Stalozaidima updatedZaidimas)
        {
            if (id != updatedZaidimas.IdStaloZaidimas)
            {
                return BadRequest("Game ID mismatch");
            }

            var existingZaidimas = await _context.Stalozaidimas.FindAsync(id);
            if (existingZaidimas == null)
            {
                return NotFound();
            }

            // Update the properties of the existing game
            existingZaidimas.Name = updatedZaidimas.Name;
            existingZaidimas.Description = updatedZaidimas.Description;
            existingZaidimas.Price = updatedZaidimas.Price;
            existingZaidimas.AlowedAge = updatedZaidimas.AlowedAge;
            existingZaidimas.Image = updatedZaidimas.Image;
            // Handle other properties like the image separately if needed

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingZaidimas);  // Return the updated game as a JSON response
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating game: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaloZaidimas(int id)
        {
            var zaidimas = await _context.Stalozaidimas.FindAsync(id);

            if (zaidimas == null)
            {
                return NotFound();
            }

            // Add logging for debugging
            Console.WriteLine($"Fetched game: {zaidimas.Name}");

            return Ok(zaidimas);
        }
        
      
    }
}
