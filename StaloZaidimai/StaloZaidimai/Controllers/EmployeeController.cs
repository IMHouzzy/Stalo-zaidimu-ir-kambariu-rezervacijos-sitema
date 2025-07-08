using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai; // Adjust the namespace as needed

namespace StaloZaidimai.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;

        public EmployeeController(StalozaidimuklubasContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _context.Darbuotojas.ToListAsync();
            return Ok(employees); // Return all employees as a JSON response
        }

        

        // DELETE: api/Employee/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Darbuotojas.FindAsync(id);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

           
            _context.Darbuotojas.Remove(employee);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Employee deleted successfully", employee });
            
            
        }
    }
}
