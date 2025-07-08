namespace StaloZaidimai;

public partial class Darbuotoja
{
    public int IdDarbuotojas { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public DateOnly HireDate { get; set; }

    public virtual ICollection<Rezervacija> FkRezervacijaidRezervacijas { get; set; } = new List<Rezervacija>();
}
