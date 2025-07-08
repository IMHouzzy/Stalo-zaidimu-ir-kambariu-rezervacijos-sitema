namespace StaloZaidimai;

public partial class Rezervacija
{
    public int IdRezervacija { get; set; }

    public DateOnly Date { get; set; }

    public TimeOnly RezevrTimeStart { get; set; }

    public TimeOnly RezevrTimeEnd { get; set; }

    public string Address { get; set; } = null!;

    public int RoomAmount { get; set; }

    public int PeopleAmount { get; set; }

    public int FkStaloZaidimasidStaloZaidimas { get; set; }

    public int FkNaudotojasidNaudotojas { get; set; }

    public int FkKambarysidKambarys { get; set; }

    public virtual Kambary FkKambarysidKambarysNavigation { get; set; } = null!;

    public virtual Naudotoja FkNaudotojasidNaudotojasNavigation { get; set; } = null!;

    public virtual Stalozaidima FkStaloZaidimasidStaloZaidimasNavigation { get; set; } = null!;

    public virtual ICollection<Darbuotoja> FkDarbuotojasidDarbuotojas { get; set; } = new List<Darbuotoja>();
}
