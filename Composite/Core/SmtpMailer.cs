using System.Net.Mail;
using System.Threading.Tasks;

namespace Composite.Core
{
    internal class SmtpMailer : IMailer
    {
        public void Send(MailMessage message)
        {
            using (var client = new SmtpClient())
            {
                client.Send(message);
            }
        }

        public async Task SendAsync(MailMessage message)
        {
            using (var client = new SmtpClient())
            {
                await client.SendMailAsync(message);
            }
        }
    }
}
