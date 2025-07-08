using Microsoft.AspNetCore.Mvc;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddRoomController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public AddRoomController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Kambary newRoom)
        {
            if (newRoom == null)
                return BadRequest("Invalid room data.");

            // Add the new room to the database
            _context.Kambarys.Add(newRoom);
            await _context.SaveChangesAsync();

            return Ok(newRoom);
        }
    }
}
