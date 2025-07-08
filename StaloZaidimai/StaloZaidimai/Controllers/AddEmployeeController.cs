using Microsoft.AspNetCore.Mvc;
using StaloZaidimai;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddEmployeeController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public AddEmployeeController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Darbuotoja newEmployee)
        {
            if (newEmployee == null)
                return BadRequest("Invalid room data.");

            // Add the new room to the database
            _context.Darbuotojas.Add(newEmployee);
            await _context.SaveChangesAsync();

            return Ok(newEmployee);
        }
    }
}
