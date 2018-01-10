using System.Net.Mail;
using System.Threading.Tasks;

namespace Composite.Core
{
    /// <summary>
    /// A contract for sending email messages.
    /// </summary>
    public interface IMailer
    {
        /// <summary>
        /// Sends the specified <see cref="MailMessage" />
        /// </summary>
        /// <param name="message">The message to send</param>
        void Send(MailMessage message);

        /// <summary>
        /// Sends the specified <see cref="MailMessage" /> an asynchronous operation.
        /// </summary>
        /// <param name="message">The message to send</param>
        /// <returns>The task object representing the asynchronous operation.</returns>
        Task SendAsync(MailMessage message);
    }
}
