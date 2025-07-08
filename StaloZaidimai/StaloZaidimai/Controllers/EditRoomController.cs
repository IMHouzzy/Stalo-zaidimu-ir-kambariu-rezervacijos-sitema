using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai; // Adjust the namespace as needed

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EditRoomController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public EditRoomController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        // PUT: api/EditRoom/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] Kambary updatedRoom)
        {
            if (id != updatedRoom.IdKambarys)
            {
                return BadRequest("Room ID mismatch");
            }

            var existingRoom = await _context.Kambarys.FindAsync(id);
            if (existingRoom == null)
            {
                return NotFound();
            }

            // Update the properties of the existing room
            existingRoom.RoomNr = updatedRoom.RoomNr;
            existingRoom.MaxPeople = updatedRoom.MaxPeople;
            existingRoom.Descrioption = updatedRoom.Descrioption;
            existingRoom.PriceRate = updatedRoom.PriceRate;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingRoom); // Return the updated room as a JSON response
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating room: {ex.Message}");
            }
        }

        // GET: api/EditRoom/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _context.Kambarys.FindAsync(id);

            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }
    }
}
