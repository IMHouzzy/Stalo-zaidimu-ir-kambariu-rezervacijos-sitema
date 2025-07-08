using MailKit.Net.Smtp;  // MailKit SmtpClient
using MimeKit;            // MimeKit žinutės kūrimas
using System.Threading.Tasks;

public class EmailService
{
    private readonly string _smtpHost = "smtp.gmail.com"; // SMTP host
    private readonly int _smtpPort = 587; // SMTP port
    private readonly string _emailFrom = "ignasmakackas@gmail.com"; // Jūsų el. paštas
    private readonly string _emailPassword = "zkbc gmet wwrh ibqk"; // Jūsų el. pašto slaptažodis

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Zaidimu kambarys", _emailFrom));  // Iš siuntėjo el. paštas
        message.To.Add(new MailboxAddress(null, toEmail)); // Gavėjo el. paštas
        message.Subject = subject;  // Laiško tema

        var bodyBuilder = new BodyBuilder { HtmlBody = body }; // HTML turinys
        message.Body = bodyBuilder.ToMessageBody();  // Body su HTML turiniu

        // Naudojame MailKit.Net.Smtp.SmtpClient
        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(_smtpHost, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls); // Asinchroninis prisijungimas
            await client.AuthenticateAsync(_emailFrom, _emailPassword); // Asinchroninis autentifikavimas
            await client.SendAsync(message); // Asinchroninis laiško siuntimas
            await client.DisconnectAsync(true); // Asinchroninis atsijungimas
        }
    }
}
