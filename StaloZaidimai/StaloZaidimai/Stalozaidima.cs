using System.ComponentModel.DataAnnotations;

namespace StaloZaidimai;

public partial class Stalozaidima
{
    public int IdStaloZaidimas { get; set; }
    [Required]
    public string Name { get; set; } = null!;
    [Range(0, 999)]
    public double Price { get; set; }

    public string? Description { get; set; }
    
    public int AlowedAge { get; set; }
    public string Image { get; set; } = null!;

    public virtual ICollection<Rezervacija> Rezervacijas { get; set; } = new List<Rezervacija>();

}
