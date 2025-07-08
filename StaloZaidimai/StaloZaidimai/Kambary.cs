namespace StaloZaidimai;

public partial class Kambary
{
    public int IdKambarys { get; set; }

    public int RoomNr { get; set; }

    public int MaxPeople { get; set; }

    public string? Descrioption { get; set; }

    public double PriceRate { get; set; }

    public virtual ICollection<Rezervacija> Rezervacijas { get; set; } = new List<Rezervacija>();
}
