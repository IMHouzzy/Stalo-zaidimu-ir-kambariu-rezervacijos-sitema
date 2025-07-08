using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddGameController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public AddGameController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddGame([FromBody] Stalozaidima newGame)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add the new game to the database
            _context.Stalozaidimas.Add(newGame);
            await _context.SaveChangesAsync();

            return Ok(newGame);
        }
    }
}
