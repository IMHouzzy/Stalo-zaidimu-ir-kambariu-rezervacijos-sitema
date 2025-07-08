namespace StaloZaidimai
{
    public class ReservationRequest
    {
        public int? Id { get; set; } // Nullable for compatibility with creation and editing
        public string Address { get; set; } = null!;
        public int RoomNumber { get; set; }
        public int PeopleNumber { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
    }

}
