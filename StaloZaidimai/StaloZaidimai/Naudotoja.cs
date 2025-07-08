using StaloZaidimai.Controllers;
using StaloZaidimai;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public partial class Naudotoja : IValidatableObject
{
    public int IdNaudotojas { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    [PasswordValidation]
    public string Password { get; set; } = null!;

    public int Age { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual ICollection<Rezervacija> Rezervacijas { get; set; } = new List<Rezervacija>();

   
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Name == "Mantas" && Age < 31)
        {
            yield return new ValidationResult("Jeigu vardas yra 'Mantas', amžius negali būti mažesnis nei 31.", new[] { nameof(Age) });
        }
    }
}
