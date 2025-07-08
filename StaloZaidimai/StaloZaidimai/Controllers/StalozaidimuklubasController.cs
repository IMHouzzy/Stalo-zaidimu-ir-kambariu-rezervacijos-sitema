using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public TestController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetStaloZaidimai()
        {
            var zaidimas = _context.Stalozaidimas.ToList();
            return Ok(zaidimas);  // Return as a JSON response
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _context.Stalozaidimas.FindAsync(id);
            if (game == null)
            {
                return NotFound("Game not found.");
            }

            _context.Stalozaidimas.Remove(game);
            await _context.SaveChangesAsync();

            return Ok(game); // Return the deleted game or success message
        }


    }

}
