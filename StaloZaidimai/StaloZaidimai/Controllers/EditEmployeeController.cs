using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai; // Adjust the namespace as needed

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EditEmployeeController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public EditEmployeeController(StalozaidimuklubasContext context)
        {
            _context = context;
        }
        // PUT: api/Employee/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] Darbuotoja updatedEmployee)
        {
            if (id != updatedEmployee.IdDarbuotojas)
            {
                return BadRequest("Employee ID mismatch");
            }

            var existingEmployee = await _context.Darbuotojas.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            existingEmployee.Name = updatedEmployee.Name;
            existingEmployee.Surname = updatedEmployee.Surname;
            existingEmployee.Email = updatedEmployee.Email;
            existingEmployee.PhoneNumber = updatedEmployee.PhoneNumber;
            existingEmployee.HireDate = updatedEmployee.HireDate;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingEmployee); // Return the updated employee as a JSON response
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error updating employee: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _context.Darbuotojas.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee); // Return a specific employee by ID
        }

    }
}
