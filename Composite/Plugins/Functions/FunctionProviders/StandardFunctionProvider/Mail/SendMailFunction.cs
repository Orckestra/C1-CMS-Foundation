using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Mail
{
    internal class SendMailFunction : StandardFunctionBase
	{
        private static readonly string LogTitle = "SendMailFunction";
        private static readonly string CompositeMediaAttachmentPrefix = "Composite/";

        public SendMailFunction(EntityTokenFactory entityTokenFactory)
            : base("SendMail", "Composite.Mail", typeof(bool), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string from = parameters.GetParameter<string>("From");
            string to = parameters.GetParameter<string>("To");
            string subject = parameters.GetParameter<string>("Subject");
            string body = parameters.GetParameter<string>("Body");
            bool isHtml = parameters.GetParameter<bool>("IsHtml");

            string replyTo = parameters.GetParameter<string>("ReplyTo");
            string cc = parameters.GetParameter<string>("CC");
            string bcc = parameters.GetParameter<string>("BCC");
            string attachment = parameters.GetParameter<string>("Attachment") ?? string.Empty;
            string attachmentFromMedia = parameters.GetParameter<string>("AttachmentFromMedia") ?? string.Empty;

            if(!attachmentFromMedia.IsNullOrEmpty())
            {
                attachment += "|" + CompositeMediaAttachmentPrefix + attachmentFromMedia;
            }

            return SendMail(subject, body, isHtml, from, to, replyTo, cc, bcc, attachment);
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextAreaWidget;
                WidgetFunctionProvider boolWidget = StandardWidgetFunctions.GetBoolSelectorWidget("True", "False");

                yield return new StandardFunctionParameterProfile("From", typeof(string), true, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("To", typeof(string), true, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("Subject", typeof(string), true, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("Body", typeof(string), true, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("IsHtml", typeof(bool), true, new ConstantValueProvider(false), boolWidget);

                yield return new StandardFunctionParameterProfile("ReplyTo", typeof(string), false, new ConstantValueProvider(""), textboxWidget);                
                yield return new StandardFunctionParameterProfile("CC", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("BCC", typeof(string), false, new ConstantValueProvider(""), textboxWidget);

                yield return new StandardFunctionParameterProfile("Attachment", typeof(string), false, new ConstantValueProvider(""), textboxWidget);

                WidgetFunctionProvider mediaSelectionWidget = StandardWidgetFunctions.GetDataReferenceWidget(typeof (IMediaFile));

                yield return new StandardFunctionParameterProfile("AttachmentFromMedia", typeof(string), false, new ConstantValueProvider(""), mediaSelectionWidget);
            }
        }

        public static bool SendMail(string subject, string body, bool isHtml, string from, string to)
        {
            return SendMail(subject, body, isHtml, from, to, null, null, null, null);
        }

        public static bool SendMail(string subject, string body, bool isHtml, string from, string to, string replyTo, string cc, string bcc, string attachmentsList)
        {
            var toDispose = new List<IDisposable>();

            try
            {
                MailMessage mailMessage = new MailMessage(from, to)
                {
                    Body = body,
                    Subject = subject,
                    IsBodyHtml = isHtml
                };

                if (!cc.IsNullOrEmpty())
                {
                    mailMessage.CC.Add(cc);
                }

                if (!bcc.IsNullOrEmpty())
                {
                    mailMessage.Bcc.Add(bcc);
                }

                if (!replyTo.IsNullOrEmpty())
                {
                    mailMessage.ReplyToList.Add(new MailAddress(replyTo));
                }

                toDispose.Add(mailMessage);

                if(!ParseAttachmentList(attachmentsList, mailMessage.Attachments, toDispose))
                {
                    return false;
                }
               


                var mailer = ServiceLocator.GetService<IMailer>();

                mailer.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                LoggingService.LogWarning(LogTitle, ex);
                return false;
            }
            finally
            {
                foreach (IDisposable obj in toDispose)
                {
                    obj.Dispose();
                }
            }
        }

        private static bool ParseAttachmentList(string attachmentList, AttachmentCollection result, IList<IDisposable> toDispose)
        {
            if (attachmentList.IsNullOrEmpty()) return true;

            foreach (var atmStr in attachmentList.Split(new[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
            {
                string line = atmStr.Trim();
                if (line.IsNullOrEmpty()) continue;

                string attachmentName;
                string filePath;
                string mimeType;

                if (line.Contains(","))
                {
                    int comaIndex = line.IndexOf(',');
                    mimeType = line.Substring(comaIndex + 1);
                    line = line.Substring(0, comaIndex).Trim();
                }
                else
                {
                    mimeType = null;
                }


                if (line.Contains("="))
                {
                    int equalSignIndex = line.IndexOf('=');
                    attachmentName = line.Substring(0, equalSignIndex).Trim();
                    filePath = line.Substring(equalSignIndex + 1).Trim();
                }
                else
                {
                    attachmentName = null;
                    filePath = line;
                }

                // Checking whether the file is from Composite media database
                if (filePath.StartsWith(CompositeMediaAttachmentPrefix))
                {
                    string compositePath = filePath.Substring(CompositeMediaAttachmentPrefix.Length);
                    string storeId = compositePath.Substring(0, compositePath.IndexOf(':'));
                    IMediaFile mediaFile;
                    try
                    {
                        mediaFile = DataFacade.GetData<IMediaFile>(f => f.StoreId == storeId && f.CompositePath == compositePath).FirstOrDefault();
                    }
                    catch (Exception e)
                    {
                        LoggingService.LogWarning(LogTitle, "Media file '{0}' cannot be found.".FormatWith(compositePath));
                        LoggingService.LogError(LogTitle, e);
                        return false;
                    }

                    Stream readStream = mediaFile.GetReadStream();

                    result.Add(new Attachment(readStream, attachmentName ?? mediaFile.Title, mimeType ?? mediaFile.MimeType));

                    continue;
                } 
                
                // File is a file on disk
                if (!filePath.Contains(@":\") && HttpContext.Current != null)
                {
                    filePath = HttpContext.Current.Server.MapPath(filePath);
                }

                if (!C1File.Exists(filePath))
                {
                    LoggingService.LogWarning(LogTitle,
                                              "Cannot create an attachment. File '{0}' does not exists".
                                                  FormatWith(filePath));
                    return false;
                }


                Attachment attachment;
                if (mimeType.IsNullOrEmpty())
                {
                    if (attachmentName.IsNullOrEmpty())
                    {
                        attachment = new Attachment(filePath);
                    }
                    else
                    {
                        attachment = new Attachment(C1File.OpenRead(filePath), attachmentName);
                    }
                }
                else
                {
                    if (attachmentName.IsNullOrEmpty())
                    {
                        attachment = new Attachment(filePath, mimeType);
                    }
                    else
                    {
                        attachment = new Attachment(C1File.OpenRead(filePath), attachmentName, mimeType);
                    }
                }

                result.Add(attachment);
            }

            return true;
        }
	}
}