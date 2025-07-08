using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace StaloZaidimai.Controllers
{
    // Custom validation attribute to check password requirements
    public class PasswordValidationAttribute : ValidationAttribute
    {
        // Override the IsValid method to implement custom validation logic
        public override bool IsValid(object value)
        {
            // If the value is null or empty, it's considered invalid
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return false;
            }

            string password = value.ToString();

            // Regular expression to check for at least:
            // - One uppercase letter
            // - One number
            // - One special character (optional)
            string pattern = @"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$";

            // Match the password against the pattern
            return Regex.IsMatch(password, pattern);
        }

        // Optional: Customize the error message
        public override string FormatErrorMessage(string name)
        {
            return $"The {name} must contain at least one uppercase letter, one number, and one special character.";
        }
    }
}
