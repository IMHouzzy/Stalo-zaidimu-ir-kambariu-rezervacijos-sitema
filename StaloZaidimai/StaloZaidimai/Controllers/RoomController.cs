using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]  // Adjusted route to match the frontend API call
    public class RoomController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public RoomController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        // Get all rooms
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _context.Kambarys.ToListAsync();
            return Ok(rooms); // Return rooms as a JSON response
        }

        // Delete a room by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Kambarys.FindAsync(id);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            _context.Kambarys.Remove(room);
            await _context.SaveChangesAsync();

            return Ok(room); // Return the deleted room or success message
        }
    }
}
