using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StaloZaidimai;
using System.Linq;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.Extensions.Logging;  // Add this at the top of your file
using PdfSharp.Pdf;
using PdfSharp.Drawing;
using System.IO;

namespace StaloZaidimai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly StalozaidimuklubasContext _context;


        public ReservationController( StalozaidimuklubasContext context)
        {
            _context = context;


        }
        private byte[] GenerateReservationPdf(Rezervacija reservation, Stalozaidima game)
        {
            // Fetch the game name based on the foreign key
            

            string gameName = game?.Name ?? "No game found"; // Ensure null handling

            using (var memoryStream = new MemoryStream())
            {
                var document = new PdfDocument();
                var page = document.AddPage();
                var gfx = XGraphics.FromPdfPage(page);

                XFont font = new XFont("Arial", 18);
                XFont tilefont = new XFont("Arial", 30);

                gfx.DrawString("Rezervacijos informacija", tilefont, XBrushes.Black, new XRect(20, 20, page.Width, page.Height), XStringFormats.TopLeft);
                gfx.DrawString($"Vieta: {reservation.Address ?? "No address provided"}", font, XBrushes.Black, new XRect(20, 60, page.Width, page.Height), XStringFormats.TopLeft);
                gfx.DrawString($"Kambarys: {reservation.RoomAmount}", font, XBrushes.Black, new XRect(20, 80, page.Width, page.Height), XStringFormats.TopLeft);

                gfx.DrawString($"Žaidimas: {gameName}", font, XBrushes.Black, new XRect(20, 100, page.Width, page.Height), XStringFormats.TopLeft);

                gfx.DrawString($"Žmonių skaičius: {reservation.PeopleAmount}", font, XBrushes.Black, new XRect(20, 120, page.Width, page.Height), XStringFormats.TopLeft);
                gfx.DrawString($"Data: {reservation.Date.ToShortDateString()}", font, XBrushes.Black, new XRect(20, 140, page.Width, page.Height), XStringFormats.TopLeft);
                gfx.DrawString($"Pradžia: {reservation.RezevrTimeStart}", font, XBrushes.Black, new XRect(20, 160, page.Width, page.Height), XStringFormats.TopLeft);
                gfx.DrawString($"Pabaiga: {reservation.RezevrTimeEnd}", font, XBrushes.Black, new XRect(20, 180, page.Width, page.Height), XStringFormats.TopLeft);

                document.Save(memoryStream, false);
                return memoryStream.ToArray();
            }
        }



        // Fetch all board games
        [HttpGet("GetBoardGames")]
        public IActionResult GetBoardGames()
        {
            var games = _context.Stalozaidimas.Select(game => new
            {
                game.IdStaloZaidimas,
                game.Name,
                game.Price
            }).ToList();

            return Ok(games);
        }

        // Fetch all available rooms
        [HttpGet("GetRooms")]
        public IActionResult GetRooms()
        {
            var rooms = _context.Kambarys.Select(room => new
            {
                room.IdKambarys,
                room.RoomNr,
                room.MaxPeople
            }).ToList();

            return Ok(rooms);
        }

        // Create a new reservation
        [HttpPost("CreateReservation")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationRequest reservationRequest)
        {

            if (reservationRequest == null)
            {
                return BadRequest("Request body is null.");
            }

            if (reservationRequest.PeopleNumber <= 0)
            {
                return BadRequest("The number of people must be greater than zero.");
            }

            // Log received data to the console
            Console.WriteLine($"Received reservation request data: {System.Text.Json.JsonSerializer.Serialize(reservationRequest)}");

            // Map the ReservationRequest to the Rezervacija model
            var reservation = new Rezervacija
            {
                Date = reservationRequest.Date, // DateOnly
                RezevrTimeStart = reservationRequest.StartTime, // TimeOnly
                RezevrTimeEnd = reservationRequest.EndTime, // TimeOnly
                Address = reservationRequest.Address,
                RoomAmount = reservationRequest.RoomNumber, // You might want to adjust this if it's meant to map room capacity
                PeopleAmount = reservationRequest.PeopleNumber,
                FkStaloZaidimasidStaloZaidimas = reservationRequest.GameId, // Foreign Key for Game
                FkNaudotojasidNaudotojas = reservationRequest.UserId, // Foreign Key for User
                FkKambarysidKambarys = reservationRequest.RoomNumber // Foreign Key for Room
            };

            // Log reservation data to the console before saving it to the database
            Console.WriteLine($"Saving reservation: {System.Text.Json.JsonSerializer.Serialize(reservation)}");

            _context.Rezervacijas.Add(reservation);
            await _context.SaveChangesAsync();
            var game = await _context.Stalozaidimas.FindAsync(reservationRequest.GameId);
            // Generate PDF document
            var pdfBytes = GenerateReservationPdf(reservation, game);

            // Return PDF as a file download
            return File(pdfBytes, "application/pdf", "Rezervacija.pdf");


        }

        [HttpGet("GetReservations")]
        public IActionResult GetReservations()
        {
            var reservations = _context.Rezervacijas
                .Select(reservation => new
                {
                    reservation.IdRezervacija,
                    reservation.Address,
                    RoomNumber = reservation.FkKambarysidKambarys, // Room number or foreign key
                    GameName = reservation.FkStaloZaidimasidStaloZaidimasNavigation.Name, // Assuming navigation property
                    reservation.PeopleAmount,
                    reservation.Date,
                    StartTime = reservation.RezevrTimeStart.ToString(@"hh\:mm"), // Format as HH:mm
                    EndTime = reservation.RezevrTimeEnd.ToString(@"hh\:mm") // Format as HH:mm
                })
                .ToList();

            return Ok(reservations);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservations(int id)
        {
            var Reservation = await _context.Rezervacijas.FindAsync(id);
            if (Reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            _context.Rezervacijas.Remove(Reservation);
            await _context.SaveChangesAsync();

            return Ok(Reservation); // Return the deleted room or success message
        }
        [HttpPut("EditReservation/{id}")]
        public async Task<IActionResult> UpdateReservation(int id, [FromBody] ReservationRequest reservationRequest)
        {
            Console.WriteLine($"Received edit reservation request data: {System.Text.Json.JsonSerializer.Serialize(reservationRequest)}");
            if (reservationRequest == null)
            {
                return BadRequest("Request body is null.");
            }

            if (reservationRequest.PeopleNumber <= 0)
            {
                return BadRequest("The number of people must be greater than zero.");
            }

            // Log received data to the console
            Console.WriteLine($"Received edit reservation request data: {System.Text.Json.JsonSerializer.Serialize(reservationRequest)}");

            // Find the existing reservation by ID
            var existingReservation = await _context.Rezervacijas.FindAsync(id);
            if (existingReservation == null)
            {
                return NotFound($"Reservation with ID {id} not found.");
            }

            // Map the updated data to the existing reservation
            existingReservation.Date = reservationRequest.Date;
            existingReservation.RezevrTimeStart = reservationRequest.StartTime;
            existingReservation.RezevrTimeEnd = reservationRequest.EndTime;
            existingReservation.Address = reservationRequest.Address;
            existingReservation.RoomAmount = reservationRequest.RoomNumber;
            existingReservation.PeopleAmount = reservationRequest.PeopleNumber;
            existingReservation.FkStaloZaidimasidStaloZaidimas = reservationRequest.GameId;
            existingReservation.FkNaudotojasidNaudotojas = reservationRequest.UserId;
            existingReservation.FkKambarysidKambarys = reservationRequest.RoomNumber;

            // Log reservation data before saving it to the database
            Console.WriteLine($"Updating reservation: {System.Text.Json.JsonSerializer.Serialize(existingReservation)}");

            _context.Rezervacijas.Update(existingReservation);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Reservation updated successfully!" });
        }







        [HttpGet("{id}")]
        public IActionResult GetReservationById(int id)
        {
            var reservation = _context.Rezervacijas.FirstOrDefault(r => r.IdRezervacija == id);
            if (reservation == null)
            {
                return NotFound("Reservation not found");
            }
            return Ok(reservation);
        }

    }

}
