using System;
using System.IO;
using System.Xml;
using Composite.Core.Extensions;
using Composite.Core.IO;

namespace Composite.Core.WebClient.Captcha
{
    internal static class CaptchaConfiguration
    {
        private static readonly string CaptchaConfigurationFilePath = @"App_Data\Composite\Configuration\Captcha.xml";

        public static string Password { get; }

        static CaptchaConfiguration()
        {
            string configurationFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, CaptchaConfigurationFilePath);

            string password = null;

            if (C1File.Exists(configurationFilePath))
            {
                var doc = new XmlDocument();
                try
                {
                    using (var sr = new C1StreamReader(configurationFilePath))
                    {
                        doc.Load(sr);
                    }

                    var passwordNode = doc.SelectSingleNode("captcha/password");
                    if (!string.IsNullOrEmpty(passwordNode?.InnerText))
                    {
                        password = passwordNode.InnerText;
                    }
                }
                catch (Exception)
                {
                    // Do nothing
                }

                if (password != null)
                {
                    Password = password;
                    return;
                }

                // Deleting configuration file
                C1File.Delete(configurationFilePath);
            }


            password = Guid.NewGuid().ToString();

            string configFile = @"<captcha> <password>{0}</password> </captcha>".FormatWith(password);

            C1File.WriteAllText(configurationFilePath, configFile);

            Password = password;
        }
    }
}
